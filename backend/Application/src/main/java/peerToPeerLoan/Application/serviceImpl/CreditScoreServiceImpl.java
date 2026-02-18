package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.CreditScoreDTO;
import peerToPeerLoan.Application.entity.*;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.*;
import peerToPeerLoan.Application.service.CreditScoreService;
import peerToPeerLoan.Application.service.UserService;
import peerToPeerLoan.Application.utils.constants.CreditGrade;
import peerToPeerLoan.Application.utils.constants.KycStatus;
import peerToPeerLoan.Application.utils.constants.LoanStatus;
import peerToPeerLoan.Application.utils.constants.RepaymentStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class CreditScoreServiceImpl implements CreditScoreService {
    @Autowired
    private  CreditScoreRepository creditScoreRepository;
    @Autowired
    private  UserService userService; // To get current user
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoanRequestRepository loanRequestRepository;
    @Autowired
    private RepaymentRepository repaymentRepository;
    @Autowired
    private KycDocumentRepository kycDocumentRepository;
    @Autowired
    private CreditScoreHistoryRepository creditScoreHistoryRepository;
    @Override
    public CreditScoreDTO getCreditScoreForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        CreditScore creditScore = creditScoreRepository.findByUser(currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Credit Score not found for user."));
        return toDTO(creditScore);
    }

    @Override
    public CreditScoreDTO getCreditScoreByUserId(String userId) {
        User user = userRepository.findById(userId).get();
        CreditScore creditScore = creditScoreRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Credit Score not found for user ID: " + userId));
        return toDTO(creditScore);
    }

    @Override
    public Integer recalculateScoreForCurrentUser() {
        User user = userService.getCurrentUser();
        return calculateCreditScoreForUser(user);
    }

    @Override
    public Integer calculateCreditScoreForUser(User user) {
        int score = 600;
        int oldScore = creditScoreRepository.findByUser(user).get().getScore();
        // 1. Repayment history
        List<Repayment> repayments = repaymentRepository.findByLoan_Borrower(user);
        for (Repayment repayment : repayments) {
            if (repayment.getStatus() == RepaymentStatus.PAID) {
                if (repayment.getPaidDate() != null && !repayment.getPaidDate().isAfter(repayment.getDueDate())) {
                    score += 100; // On time
                } else if (repayment.getPaidDate() != null &&
                        ChronoUnit.DAYS.between(repayment.getDueDate(), repayment.getPaidDate()) <= 7) {
                    score += 50; // Slightly late
                } else {
                    score -= 50; // Significantly late
                }
            } else {
                // Still unpaid
                score -= 100;
            }
        }
    KycDocument kycDocument = kycDocumentRepository.findByUser(user).get();
        // 2. KYC status
        if (kycDocument.getKycStatus() == KycStatus.REJECTED) {
            score -= 100;
        }

        // 3. Active Loans
        int activeLoans = loanRequestRepository.countByBorrowerAndStatus(user, LoanStatus.FUNDED);
        score -= (activeLoans * 10);

        // 4. Successfully repaid loans
        int repaidLoans = loanRequestRepository.countByBorrowerAndStatus(user, LoanStatus.REPAID);
        score += (repaidLoans * 10);

        // 5. (Optional) Loan Utilization Ratio
        List<LoanRequest> allLoans = loanRequestRepository.findByBorrower(user);
        double totalRequested = allLoans.stream().mapToDouble(LoanRequest::getAmount).sum();
        double totalFunded = allLoans.stream().mapToDouble(LoanRequest::getTotalFundedAmount).sum();

        if (totalRequested > 0) {
            double utilization = totalFunded / totalRequested;
            if (utilization > 0.9) {
                score -= 20;
            } else if (utilization < 0.5) {
                score += 10;
            }
        }

        // Cap score between 300 and 900
        score = Math.max(300, Math.min(score, 900));

        // Save or update in DB
        CreditScore creditScore = creditScoreRepository.findByUser(user)
                .orElse(new CreditScore());
        creditScore.setUser(user);
        creditScore.setScore(score);
        creditScore.setLastEvaluated(LocalDate.now());
        creditScoreRepository.save(creditScore);

        if (oldScore!=score) {
            CreditScoreHistory history = new CreditScoreHistory();
            history.setUser(user);
            history.setOldScore(oldScore);
            history.setNewScore(score);
            history.setReason("Scheduled update based on repayment");
            history.setUpdatedAt(LocalDateTime.now());

            creditScoreHistoryRepository.save(history);
        }

        return score;
    }


    private CreditGrade getCreditGrade(int score) {
        if (score >= 750) return CreditGrade.EXCELLENT;
        else if (score >= 650) return CreditGrade.GOOD;
        else if (score >= 550) return CreditGrade.FAIR;
        else return CreditGrade.POOR;
    }
    public CreditScoreDTO toDTO(CreditScore score) {

        CreditScoreDTO dto = new CreditScoreDTO();
        dto.setId(score.getId());
        dto.setUserId(score.getUser().getId());
        dto.setScore(score.getScore());
        dto.setLastEvaluated(score.getLastEvaluated());
        dto.setRemarks(score.getRemarks());
        dto.setGrade(score.getGrade());

        return dto;
    }
}
