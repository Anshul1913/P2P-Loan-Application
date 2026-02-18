package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.LoanFundingDTO;
import peerToPeerLoan.Application.dto.LoanRequestDTO;
import peerToPeerLoan.Application.dto.LoanSummaryDTO;
import peerToPeerLoan.Application.entity.EMI;
import peerToPeerLoan.Application.entity.LoanFunding;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.*;
import peerToPeerLoan.Application.service.LoanRequestService;
import peerToPeerLoan.Application.utils.constants.EmiStatus;
import peerToPeerLoan.Application.utils.constants.LoanStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoanRequestServiceImpl implements LoanRequestService {
    @Autowired
    private  LoanRequestRepository loanRequestRepository;
    @Autowired
    private  LoanFundingRepository loanFundingRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private CreditScoreRepository creditScoreRepository;
    @Autowired
    private EmiRepository emiRepository;

    @Override
    public List<LoanRequestDTO> getAvailableLoanRequests() {
        List<LoanRequest> loans = loanRequestRepository.findByStatus(LoanStatus.OPEN);
        return loans.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public LoanRequestDTO getLoanRequestById(String id) {
        LoanRequest loan = loanRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        return toDTO(loan);
    }

    @Override
    public LoanSummaryDTO getLoanSummary(String id) {
        LoanRequest loan = loanRequestRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Loan not found"));
        List<LoanFunding> fundings = loanFundingRepository.findByLoan(loan);

        Double totalFunded = fundings.stream().mapToDouble(LoanFunding::getAmountFunded).sum();

        return toSummaryDTO(loan,fundings);

    }

    @Override
    public List<LoanRequestDTO> getAllLoanRequests() {
        return loanRequestRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<LoanRequestDTO> getAllLoanRequests(String status) {
        LoanStatus loanStatus = LoanStatus.valueOf(status.toUpperCase());
        return loanRequestRepository.findByStatus(loanStatus).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public String approveFunding(String id) {
        return "";
    }

    @Override
    public String rejectFunding(String id) {
        return "";
    }

    @Override
    public LoanRequestDTO createLoanRequest(LoanRequestDTO request) {
        User borrower = userService.getCurrentUser();
        System.out.println(request);
        LoanRequest loan = new LoanRequest();
        loan.setAmount(request.getAmount());
        loan.setTitle(request.getTitle());
        loan.setMaxInterestRateAcceptable(request.getMaxInterestRateAcceptable());
        loan.setDurationMonths(request.getDurationMonths());
        loan.setPurpose(request.getPurpose());
        loan.setStatus(LoanStatus.OPEN);

        loan.setBorrower(borrower);
        loan.setExpiryDate(LocalDateTime.now().plusDays(7));

        loan = loanRequestRepository.save(loan);
        return toDTO(loan);
    }

    @Override
    public List<LoanRequestDTO> getLoanRequestsOfCurrentUser() {
        User user = userService.getCurrentUser();
        List<LoanRequest> loans = loanRequestRepository.findByBorrower(user);
        return loans.stream().map(this::toDTO).collect(Collectors.toList());

    }

    @Override
    public String cancelLoanRequest(String id) {
        LoanRequest loan = loanRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        if (!loan.getStatus().equals(LoanStatus.OPEN)) {
            throw new RuntimeException("Only OPEN loans can be cancelled");
        }

        loan.setStatus(LoanStatus.CANCELLED);
        loanRequestRepository.save(loan);
        return "Loan cancelled";
    }
    private LoanRequestDTO toDTO(LoanRequest loanRequest) {
        LoanRequestDTO dto = new LoanRequestDTO();
        dto.setId(loanRequest.getId());
        dto.setAmount(loanRequest.getAmount());
        dto.setMaxInterestRateAcceptable(loanRequest.getMaxInterestRateAcceptable());
        dto.setTitle(loanRequest.getTitle());
        dto.setDurationMonths(loanRequest.getDurationMonths());
        dto.setPurpose(loanRequest.getPurpose());
        dto.setStatus(loanRequest.getStatus().name());
        dto.setBorrowerId(loanRequest.getBorrower().getId());
        dto.setBorrowerName(loanRequest.getBorrower().getName());
        dto.setExpiryDate(loanRequest.getExpiryDate());
        dto.setTotalFundedAmount(loanRequest.getTotalFundedAmount());
        dto.setScore(creditScoreRepository.findByUser(loanRequest.getBorrower()).get().getScore());
        List<LoanFunding> loanFundings = loanFundingRepository.findByLoan(loanRequest);
        System.out.println("Loan funding is : "+loanFundings);
        double totalMonthlyEmi=0;
        int totalEmi=0;
        double totalEmiAmount=0,paidEmiAmount =0,outstanding;
        int emiPaid=0;
        LocalDate nextEmiDate = null;

        for(LoanFunding lf:loanFundings){
            List<EMI> emis=emiRepository.findByLoanFundingId(lf.getId());
            totalMonthlyEmi+=emis.stream().findFirst().get().getEmiAmount();
            totalEmi+=emis.size();
            emiPaid += (int) emis.stream()
                    .filter(emi -> emi.getStatus().equals(EmiStatus.PAID))
                    .count();

             totalEmiAmount += emis.stream()
                    .mapToDouble(EMI::getEmiAmount)
                    .sum();

             paidEmiAmount += emis.stream()
                    .filter(emi -> emi.getStatus() == EmiStatus.PAID)
                    .mapToDouble(EMI::getEmiAmount)
                    .sum();

            Optional<EMI> nextEmi = emis.stream()
                    .filter(emi -> emi.getStatus() != EmiStatus.PAID) // only unpaid
                    .min(Comparator.comparing(EMI::getDueDate));

            if (nextEmi.isPresent()) {
                if (nextEmiDate == null || nextEmi.get().getDueDate().isBefore(nextEmiDate)) {
                    nextEmiDate = nextEmi.get().getDueDate(); // earliest among all fundings
                }
            }
        }
        outstanding = totalEmiAmount - paidEmiAmount;
        System.out.println(totalEmiAmount);
        System.out.println(paidEmiAmount);
        System.out.println(nextEmiDate);
        dto.setNextEmiDate(nextEmiDate);
        dto.setOutstanding(outstanding);
        dto.setEmiPaid(emiPaid);
        dto.setTotalEmi(totalEmi);
        dto.setMonthlyEmi(totalMonthlyEmi);
        return dto;
    }

    private LoanSummaryDTO toSummaryDTO(LoanRequest loanRequest, List<LoanFunding> fundings) {
        LoanSummaryDTO dto = new LoanSummaryDTO();
        dto.setLoanId(loanRequest.getId());
        dto.setTotalRequestedAmount(loanRequest.getAmount());
        dto.setStatus(loanRequest.getStatus().name());

        Double totalFunded = fundings.stream().mapToDouble(LoanFunding::getAmountFunded).sum();
        dto.setTotalAmountFunded(totalFunded);
        dto.setTotalFunders(fundings.size());

        List<LoanFundingDTO> fundingDTOs = fundings.stream().map(funding -> {
            LoanFundingDTO f = new LoanFundingDTO();
            f.setId(funding.getId());
            f.setLenderId(funding.getLender().getId());
            f.setLenderName(funding.getLender().getName()); // assuming getFullName() exists
            f.setAmountFunded(funding.getAmountFunded());
            f.setTimestamp(funding.getTimestamp());
            return f;
        }).collect(Collectors.toList());

        dto.setFundings(fundingDTOs);

        return dto;
    }


}
