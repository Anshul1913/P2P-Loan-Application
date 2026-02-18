package peerToPeerLoan.Application.serviceImpl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.RepaymentDTO;
import peerToPeerLoan.Application.entity.LoanFunding;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.entity.Repayment;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.LoanFundingRepository;
import peerToPeerLoan.Application.repository.LoanRequestRepository;
import peerToPeerLoan.Application.repository.RepaymentRepository;
import peerToPeerLoan.Application.service.CreditScoreService;
import peerToPeerLoan.Application.service.LoanRequestService;
import peerToPeerLoan.Application.service.RepaymentService;
import peerToPeerLoan.Application.service.UserService;
import peerToPeerLoan.Application.utils.EMIUtil;
import peerToPeerLoan.Application.utils.constants.LoanStatus;
import peerToPeerLoan.Application.utils.constants.RepaymentStatus;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RepaymentServiceImpl implements RepaymentService {

    @Autowired
    private LoanRequestRepository loanRequestRepository;
    @Autowired
    private LoanFundingRepository loanFundingRepository;

    @Autowired
    private RepaymentRepository repaymentRepository;
    @Autowired
    private CreditScoreService creditScoreService;
    @Autowired
    private UserService userService; // to get current logged-in user


    public List<Repayment> generateEMISchedule(String loanRequestId) {
        LoanRequest loan = loanRequestRepository.findById(loanRequestId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if (!loan.getStatus().equals(LoanStatus.FUNDED)) {
            throw new IllegalStateException("Loan must be funded before generating EMIs");
        }

        double principal = loan.getAmount();
        double rate = loan.getMaxInterestRateAcceptable();
        int months = loan.getDurationMonths();

        double emiAmount = EMIUtil.calculateEMI(principal, rate, months);
        List<Repayment> repayments = new ArrayList<>();

        LocalDate startDate = LocalDate.now().plusMonths(1); // 1st EMI next month

        for (int i = 0; i < months; i++) {
            Repayment repayment = new Repayment();
            repayment.setDueDate(startDate.plusMonths(i));
            repayment.setAmount(Math.round(emiAmount * 100.0) / 100.0); // round to 2 decimals
            repayment.setLoan(loan);
            repayments.add(repayment);
        }

        return repaymentRepository.saveAll(repayments);
    }

    @Override
    public List<RepaymentDTO> getRepaymentsForCurrentUser() {
        User currentUser = userService.getCurrentUser();

        List<LoanRequest> loans = loanRequestRepository.findByBorrower(currentUser);
        List<Repayment> allRepayments = new ArrayList<>();

        for (LoanRequest loan : loans) {
            allRepayments.addAll(repaymentRepository.findByLoan(loan));
        }

        return allRepayments.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public RepaymentDTO getRepaymentById(String id) {
        Repayment repayment = repaymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Repayment not found"));
        return toDTO(repayment);
    }


    @Override
    public String markAsPaid(String id) {
        Repayment repayment = repaymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Repayment not found"));

        if (repayment.getStatus().equals(RepaymentStatus.PAID)) {
            return "Already paid";
        }
        double totalAmount = repayment.getAmount() + repayment.getLateFee();


        repayment.setStatus(RepaymentStatus.PAID);
        repaymentRepository.save(repayment);
        creditScoreService.calculateCreditScoreForUser(repayment.getLoan().getBorrower());

        // Optional: update loan status to REPAID if all repayments paid
        LoanRequest loan = repayment.getLoan();
        boolean allPaid = repaymentRepository.findByLoan(loan)
                .stream()
                .allMatch(r -> r.getStatus() == RepaymentStatus.PAID);

        if (allPaid) {
            loan.setStatus(LoanStatus.REPAID);
            loanRequestRepository.save(loan);
        }

        return "Marked as paid successfully";
    }


    @Override
    public String generateRepaymentSchedule(String loanId) {
        LoanRequest loan = loanRequestRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan not found"));

        if (!loan.getStatus().equals(LoanStatus.FUNDED)) {
            throw new IllegalStateException("Loan must be funded before generating schedule");
        }

        double principal = loan.getAmount();
        double rate = loan.getMaxInterestRateAcceptable();
        int months = loan.getDurationMonths();

        double emiAmount = EMIUtil.calculateEMI(principal, rate, months);
        LocalDate startDate = LocalDate.now().plusMonths(1);

        List<Repayment> repayments = new ArrayList<>();

        for (int i = 0; i < months; i++) {
            Repayment repayment = new Repayment();
            repayment.setLoan(loan);
            repayment.setAmount(Math.round(emiAmount * 100.0) / 100.0);
            repayment.setDueDate(startDate.plusMonths(i));
            repayment.setStatus(RepaymentStatus.PENDING);
            repayments.add(repayment);
        }

        repaymentRepository.saveAll(repayments);
        return "Repayment schedule generated successfully";
    }
    @Override
    public void applyLateFeesToOverdueRepayments() {
        List<Repayment> overdueRepayments = repaymentRepository.findByStatus(RepaymentStatus.PENDING);

        for (Repayment repayment : overdueRepayments) {
            if (repayment.isOverdue()) {
                long daysLate = ChronoUnit.DAYS.between(repayment.getDueDate(), LocalDate.now());
                double lateFee = daysLate * 100.0; // example: ₹10 per day late

                repayment.setLateFee(lateFee);
                repayment.setStatus(RepaymentStatus.LATE);
                repaymentRepository.save(repayment);
            }
        }
    }

    @Override
    public List<RepaymentDTO> getRepaymentsForCurrentLender() {
        User currentLender = userService.getCurrentUser();

        // Step 1: Get fundings made by current lender
        List<LoanFunding> fundings = loanFundingRepository.findByLender(currentLender);

        // Step 2: Extract distinct loans funded
        Set<LoanRequest> fundedLoans = fundings.stream()
                .map(LoanFunding::getLoan)
                .collect(Collectors.toSet());

        // Step 3: Collect all repayments from those loans
        List<Repayment> repayments = fundedLoans.stream()
                .flatMap(loan -> repaymentRepository.findByLoan(loan).stream())
                .toList();

        // Step 4: Map to DTOs
        return repayments.stream().map(this::toDTO).toList();
    }


    public RepaymentDTO toDTO(Repayment repayment) {
        RepaymentDTO dto = new RepaymentDTO();
        dto.setId(repayment.getId());
        dto.setDueDate(repayment.getDueDate());
        dto.setAmount(repayment.getAmount());
        dto.setStatus(repayment.getStatus().name()); // or use enum if your DTO supports it
        dto.setLoanId(repayment.getLoan().getId());
        return dto;
    }
}
