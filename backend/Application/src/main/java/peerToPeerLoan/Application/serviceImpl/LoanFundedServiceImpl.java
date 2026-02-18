package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.IllegalTransactionStateException;
import peerToPeerLoan.Application.dto.ActiveLoanDTO;
import peerToPeerLoan.Application.dto.LoanFundingDTO;
import peerToPeerLoan.Application.dto.TopFunderDTO;
import peerToPeerLoan.Application.entity.*;
import peerToPeerLoan.Application.exception.InvalidTransactionException;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.*;
import peerToPeerLoan.Application.service.EmiService;
import peerToPeerLoan.Application.service.LoanFundedService;
import peerToPeerLoan.Application.utils.constants.FundingStatus;
import peerToPeerLoan.Application.utils.constants.LoanStatus;
import peerToPeerLoan.Application.utils.constants.TransactionType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanFundedServiceImpl implements LoanFundedService {
    @Autowired
    private LoanFundingRepository loanFundingRepository;

    @Autowired
    private LoanRequestRepository loanRequestRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserServiceImpl userService; // To get current user
    @Autowired
    private EmiService emiService;
    private LoanFundingDTO toDTO(LoanFunding funding) {
        LoanFundingDTO dto = new LoanFundingDTO();
        dto.setId(funding.getId());
        dto.setAmountFunded(funding.getAmountFunded());
        dto.setProcessingFee(funding.getProcessingFee());
        dto.setGstOnFee(funding.getGstOnFee());
        dto.setNetDisbursedAmount(funding.getNetDisbursedAmount());
        dto.setTimestamp(funding.getTimestamp());
        dto.setLenderId(funding.getLender().getId());
        dto.setLenderName(funding.getLender().getName());
        return dto;
    }

    @Override
    public List<TopFunderDTO> getTopFunders(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<Object[]> results = loanFundingRepository.findTopFunders(pageable);

        return results.stream()
                .map(obj -> new TopFunderDTO(
                        (String) obj[0],
                        ((Double) obj[1])
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<ActiveLoanDTO> getActiveLoans() {
        return List.of();
    }

    @Override
    public List<LoanFundingDTO> getFundingsByLoanId(String loanId) {
        LoanRequest loan = loanRequestRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        List<LoanFunding> fundings = loanFundingRepository.findByLoan(loan);
        return fundings.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public LoanFundingDTO fundLoan(LoanFundingDTO fundingRequest) {
        System.out.println(fundingRequest);
        User lender = userService.getCurrentUser();
        LoanRequest loan = loanRequestRepository.findById(fundingRequest.getLoanId()).get();

        double amount = fundingRequest.getAmountFunded();

        Wallet lenderWallet = walletRepository.findByUserId(lender.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found for lender"));

        if (lenderWallet.getBalance() < amount) {
            throw new InvalidTransactionException("Insufficient wallet balance");
        }

        // Create LoanFunding entry with PENDING status
        LoanFunding funding = new LoanFunding();
        funding.setLoan(loan);
        funding.setLender(lender);
        funding.setAmountFunded(amount);

        funding.setMonthlyInterestRate(loan.getMaxInterestRateAcceptable());
        funding.setFundingStatus(FundingStatus.PENDING);
        funding.setTimestamp(LocalDateTime.now());
        calculateDeductions(funding, 3.0, 18.0); // Example: 2% processing fee, 18% GST

        funding=loanFundingRepository.save(funding);
        approveFunding(funding.getId());
        emiService.generateEmiSchedule(funding.getId());
//        loan.setTotalFundedAmount(loan.getTotalFundedAmount()+fundingRequest.getAmountFunded());
//        if (loan.getTotalFundedAmount().equals(loan.getAmount())){
//            loan.setIsFullyFunded(true);
//        }
       loan= loanRequestRepository.save(loan);
        System.out.println(loan);
        System.out.println(funding);
        return toDTO(funding);
    }
    private void calculateDeductions(LoanFunding funding, double processingFeePercent, double gstPercent) {
        User admin = userRepository.findByUsername("admin@p2ploan.com").get();
        double processingFee = (funding.getAmountFunded() * processingFeePercent) / 100.0;
        System.out.println("Processing Fees "+processingFee);
        double gstOnFee = (processingFee * gstPercent) / 100.0;
        System.out.println("GST on Fees "+gstOnFee);
        double netDisbursed = funding.getAmountFunded() - (processingFee + gstOnFee);
        System.out.println("disbursed Amount "+netDisbursed);
        Wallet adminWallet = walletRepository.findByUserId(admin.getId()).get();
        adminWallet.setBalance(adminWallet.getBalance()+funding.getAmountFunded()-netDisbursed);
        walletRepository.save(adminWallet);
        Transactions lenderTxn = new Transactions();
        lenderTxn.setAmount(funding.getAmountFunded()-netDisbursed);
        lenderTxn.setUser(admin);
        lenderTxn.setTransactionType(TransactionType.LOAN_DISBURSEMENT);
        lenderTxn.setDescription("Loan funded by lender: " + funding.getLender().getName());
        lenderTxn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(lenderTxn);

        funding.setProcessingFee(processingFee);
        funding.setGstOnFee(gstOnFee);
        funding.setNetDisbursedAmount(netDisbursed);
    }

    @Override
    public List<LoanFundingDTO> getFundingsOfCurrentLender() {
        User lender = userService.getCurrentUser();
        List<LoanFunding> fundings = loanFundingRepository.findByLender(lender);
        return fundings.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public String approveFunding(String fundingId) {
        LoanFunding funding = loanFundingRepository.findById(fundingId)
                .orElseThrow(() -> new ResourceNotFoundException("Funding not found"));

        if (!funding.getFundingStatus().equals(FundingStatus.PENDING)) {
            throw new IllegalStateException("Funding already processed");
        }

        LoanRequest loan = funding.getLoan();
        User lender = funding.getLender();
        Double amount = funding.getAmountFunded();

        Wallet lenderWallet = walletRepository.findByUserId(lender.getId()).get();

        if (lenderWallet.getBalance() < amount) {
            throw new IllegalTransactionStateException("Lender has insufficient balance");
        }

        // Deduct from lender wallet
        lenderWallet.setBalance(lenderWallet.getBalance() - amount);
        walletRepository.save(lenderWallet);

        // Add transaction for lender
        Transactions lenderTxn = new Transactions();
        lenderTxn.setAmount(amount);
        lenderTxn.setUser(lender);
        lenderTxn.setTransactionType(TransactionType.LOAN_DISBURSEMENT);
        lenderTxn.setDescription("Loan funded: " + loan.getId());
        lenderTxn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(lenderTxn);

        double netDisbursedAmount = funding.getNetDisbursedAmount();
        // Add to borrower's wallet
        Wallet borrowerWallet = walletRepository.findByUserId(loan.getBorrower().getId()).get();

        borrowerWallet.setBalance(borrowerWallet.getBalance() + netDisbursedAmount);
        walletRepository.save(borrowerWallet);

        // Add transaction for borrower
        Transactions borrowerTxn = new Transactions();
        borrowerTxn.setAmount(netDisbursedAmount);
        borrowerTxn.setUser(loan.getBorrower());
        borrowerTxn.setTransactionType(TransactionType.LOAN_FUNDING);
        borrowerTxn.setDescription("Loan received from lender: " + lender.getId());
        borrowerTxn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(borrowerTxn);

        // Update funding status
        funding.setFundingStatus(FundingStatus.APPROVED);
        loanFundingRepository.save(funding);

        // Update loan funding amount
        double newFundedAmount = loan.getTotalFundedAmount() + amount;
        loan.setTotalFundedAmount(newFundedAmount);
        if (newFundedAmount >= loan.getAmount()) {
            loan.setIsFullyFunded(true);
            loan.setStatus(LoanStatus.FUNDED);
        } else {
            loan.setStatus(LoanStatus.PARTIALLY_FUNDED);
        }
        loanRequestRepository.save(loan);

        return "Funding approved successfully";
    }

    @Override
    public String rejectFunding(String fundingId) {
        LoanFunding funding = loanFundingRepository.findById(fundingId)
                .orElseThrow(() -> new ResourceNotFoundException("Funding not found"));

        if (!funding.getFundingStatus().equals(FundingStatus.PENDING)) {
            throw new IllegalTransactionStateException("Funding already processed");
        }

        funding.setFundingStatus(FundingStatus.REJECTED);
        loanFundingRepository.save(funding);

        return "Funding rejected";
    }
}
