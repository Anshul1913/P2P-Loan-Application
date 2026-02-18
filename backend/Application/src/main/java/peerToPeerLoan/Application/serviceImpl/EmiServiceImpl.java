package peerToPeerLoan.Application.serviceImpl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.EmiDTO;
import peerToPeerLoan.Application.dto.EmiDashboardDTO;
import peerToPeerLoan.Application.dto.PayEmiDTO;
import peerToPeerLoan.Application.entity.*;
import peerToPeerLoan.Application.exception.InvalidTransactionException;
import peerToPeerLoan.Application.repository.*;
import peerToPeerLoan.Application.service.EmiService;
import peerToPeerLoan.Application.utils.EMIUtil;
import peerToPeerLoan.Application.utils.constants.EmiStatus;
import peerToPeerLoan.Application.utils.constants.TransactionType;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class EmiServiceImpl implements EmiService {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private EmiRepository emiRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private LoanRequestRepository loanRequestRepository;
    @Autowired
    private  LoanFundingRepository loanFundingRepository;
    @Autowired
    private TransactionRepository transactionRepository;
//    @Autowired
//    private EMIUtil emiUtil;
    @Override
    public EmiDashboardDTO getDashboard() {
        User borrower = userService.getCurrentUser();

        List<LoanRequest> loans = loanRequestRepository.findByBorrower_Id(borrower.getId());
        List<EMI> emis = emiRepository.findByLoanFunding_Loan_Borrower_IdOrderByDueDateAsc(borrower.getId());

        // 1. Total loans
        int totalLoans = loans.size();

        // 2. Total outstanding
        double totalOutstanding = emis.stream()
                .filter(e -> e.getStatus() != EmiStatus.PAID)
                .mapToDouble(EMI::getEmiAmount)
                .sum();

        // 3. Monthly EMI (sum of this month’s EMIs still pending)
        YearMonth currentMonth = YearMonth.now();
        double monthlyEmi = emis.stream()
                .filter(e -> YearMonth.from(e.getDueDate()).equals(currentMonth))
                .filter(e -> e.getStatus() != EmiStatus.PAID)
                .mapToDouble(EMI::getEmiAmount)
                .sum();

        // 4. Next EMI
        EMI nextEmi = emis.stream()
                .filter(e -> e.getStatus() == EmiStatus.PENDING)
                .filter(e -> !e.getDueDate().isBefore(LocalDate.now()))
                .findFirst()
                .orElse(null);

        EmiDashboardDTO.NextEmiDTO nextEmiDto = null;
        if (nextEmi != null) {
            nextEmiDto = new EmiDashboardDTO.NextEmiDTO(
                    nextEmi.getId(),
                    nextEmi.getDueDate(),
                    nextEmi.getEmiAmount(),
                    nextEmi.getLoanFunding().getLoan().getTitle()
            );
        }

        // 5. Loans summary
        List<EmiDashboardDTO.LoanSummaryDTO> loanSummaries = loans.stream().map(loan -> {
            double outstanding = emis.stream()
                    .filter(e -> e.getLoanFunding().getLoan().getId().equals(loan.getId()))
                    .filter(e -> e.getStatus() != EmiStatus.PAID)
                    .mapToDouble(EMI::getEmiAmount)
                    .sum();

            EMI nextLoanEmi = emis.stream()
                    .filter(e -> e.getLoanFunding().getLoan().getId().equals(loan.getId()))
                    .filter(e -> e.getStatus() == EmiStatus.PENDING)
                    .filter(e -> !e.getDueDate().isBefore(LocalDate.now()))
                    .findFirst()
                    .orElse(null);

            return new EmiDashboardDTO.LoanSummaryDTO(
                    loan.getId(),
                    loan.getTitle(),
                    loan.getAmount(),
                    outstanding,
                    outstanding / loan.getDurationMonths(),
                    loan.getMaxInterestRateAcceptable(), // OR monthlyInterestRate from funding
                    loan.getDurationMonths(),
                    (int) emis.stream()
                            .filter(e -> e.getLoanFunding().getLoan().getId().equals(loan.getId()))
                            .filter(e -> e.getStatus() != EmiStatus.PAID)
                            .count(),
                    nextLoanEmi != null ? nextLoanEmi.getDueDate() : null,
                    loan.getStatus().name(),
                    loan.getBorrower().getName() // Or lender name from LoanFunding
            );
        }).toList();

        // 6. Upcoming EMIs
        List<EmiDashboardDTO.EmiDetailDTO> upcomingEmis = emis.stream()
                .filter(e -> e.getStatus() == EmiStatus.PENDING)
                .filter(e -> !e.getDueDate().isBefore(LocalDate.now()))
                .map(e -> new EmiDashboardDTO.EmiDetailDTO(
                        e.getId(),
                        e.getDueDate(),
                        e.getEmiAmount(),
                        e.getLoanFunding().getLoan().getId(),
                        "upcoming"
                )).toList();

        // 7. EMI history
        List<EmiDashboardDTO.EmiDetailDTO> emiHistory = emis.stream()
                .filter(e -> e.getStatus() != EmiStatus.PENDING)
                .map(e -> new EmiDashboardDTO.EmiDetailDTO(
                        e.getId(),
                        e.getDueDate(),
                        e.getEmiAmount(),
                        e.getLoanFunding().getLoan().getId(),
                        e.getStatus().name().toLowerCase()
                )).toList();

        return new EmiDashboardDTO(
                totalLoans,
                totalOutstanding,
                monthlyEmi,
                nextEmiDto,
                loanSummaries,
                upcomingEmis,
                emiHistory
        );
    }
    @Transactional
    @Override
    public PayEmiDTO payEmi(String emiId, Double amount) {
        EMI emi =emiRepository.findById(emiId).get();
        Wallet borrowerWallet = walletRepository.findByUser(userService.getCurrentUser()).get();


        if (borrowerWallet.getBalance() < amount) {
             throw  new InvalidTransactionException("Insufficient wallet balance");
        }
        borrowerWallet.setBalance(borrowerWallet.getBalance() - amount);
        walletRepository.save(borrowerWallet);
        Wallet lenderWallet = walletRepository.findByUser(emi.getLoanFunding().getLender()).get();
        lenderWallet.setBalance(lenderWallet.getBalance()+amount);
        walletRepository.save(lenderWallet);

        // Record transaction
        Transactions borrowerTxn = new Transactions();
        borrowerTxn.setAmount(amount);
        borrowerTxn.setUser(borrowerWallet.getUser());
        borrowerTxn.setTransactionType(TransactionType.EMI_PAYMENT);
        System.out.println(emi.getLoanRequest());
        borrowerTxn.setDescription("EMI Payment for Loan ID: " + emi.getLoanRequest().getId()+"Lender name is "+emi.getLoanFunding().getLender().getName());
        borrowerTxn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(borrowerTxn);

        Transactions lenderTxn = new Transactions();
        lenderTxn.setAmount(amount);
        lenderTxn.setUser(emi.getLoanFunding().getLender());
        lenderTxn.setTransactionType(TransactionType.LOAN_REPAYMENT);
        lenderTxn.setTimestamp(LocalDateTime.now());
        transactionRepository.save(lenderTxn);

        emi.setPaidDate(LocalDate.now());
        emi.setStatus(EmiStatus.PAID);
        emiRepository.save(emi);

        // Deduct the amount from wallet
        // TODO: Update wallet in DB
        System.out.println("Deducting " + amount + " from wallet for EMI: " + emiId);

        // TODO: Update EMI record as paid in DB
        System.out.println("Marking EMI " + emiId + " as paid");

        return new PayEmiDTO( "Payment successful",true);
    }

    @Override
    public void generateEmiSchedule(String loanFundingId) {
        LoanFunding funding = loanFundingRepository.findById(loanFundingId)
                .orElseThrow(() -> new RuntimeException("Loan funding not found"));

        LoanRequest loan = funding.getLoan();
        Double principal = funding.getAmountFunded();
        Double monthlyInterestRate = funding.getMonthlyInterestRate();
        int tenureMonths = loan.getDurationMonths();
        System.out.println(principal);
        System.out.println(monthlyInterestRate);
        System.out.println(tenureMonths);
        Double emiAmount = EMIUtil.calculateEMI(principal,monthlyInterestRate,tenureMonths);


        LocalDate dueDate = LocalDate.now().plusMonths(1); // First EMI due next month

        for (int i = 1; i <= tenureMonths; i++) {
            EMI emi = new EMI();
            emi.setLoanFunding(funding);
            emi.setDueDate(dueDate);
            emi.setStatus(EmiStatus.PENDING);
            emi.setEmiAmount(emiAmount);
            emi.setLoanFunding(funding);
            emi.setLoanRequest(loan);
            emiRepository.save(emi);

            // Reduce principal for next month calculation
            dueDate = dueDate.plusMonths(1);
        }
    }

    @Override
    public List<EmiDTO> getEmisByLoanFunding(String  loanFundingId) {
        List<EMI> emis = emiRepository.findByLoanFundingId(loanFundingId);
        return emis.stream().map(this::toDto).toList();
    }
    private EmiDTO toDto(EMI emi){
        EmiDTO emiDTO = new EmiDTO();
        emiDTO.setId(emi.getId());
        emiDTO.setEmiAmount(emi.getEmiAmount());
        emiDTO.setStatus(emi.getStatus().name());
        emiDTO.setDueDate(emi.getDueDate());
        emiDTO.setPaidDate(emi.getPaidDate());
        emiDTO.setLoanTitle(emi.getLoanFunding().getLoan().getTitle());
        emiDTO.setLenderName(emi.getLoanFunding().getLender().getName());
        return emiDTO;
    }

    @Override
    public void markEmiAsPaid(String emiId) {
        EMI emi = emiRepository.findById(emiId)
                .orElseThrow(() -> new RuntimeException("EMI not found"));

        emi.setStatus(EmiStatus.PAID);
        emi.setPaidDate(LocalDate.now());
        emiRepository.save(emi);
    }

    @Override
    public Page<EmiDTO> getAllEmiOfCurrentUser(Pageable pageable) {
        User borrower = userService.getCurrentUser(); // logged-in borrower
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.ASC, "dueDate")   // sort by dueDate ascending
        );

        Page<EMI> emis=emiRepository.findByLoanFunding_Loan_Borrower_Id(borrower.getId(),sortedPageable);
        return emis.map(this::toDto);
    }
}
