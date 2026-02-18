package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmiDashboardDTO {
    private int totalLoans;
    private double totalOutstanding;
    private double monthlyEMI;

    private NextEmiDTO nextEMI;
    private List<LoanSummaryDTO> loans;
    private List<EmiDetailDTO> upcomingEMIs;
    private List<EmiDetailDTO> emiHistory;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NextEmiDTO {
        private String id;
        private LocalDate date;
        private double amount;
        private String loanTitle;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class LoanSummaryDTO {
        private String id;
        private String title;
        private double principal;
        private double outstanding;
        private double monthlyEMI;
        private double interestRate;
        private int tenure;
        private int remainingMonths;
        private LocalDate nextEMIDate;
        private String status;
        private String lender;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EmiDetailDTO {
        private String id;
        private LocalDate date;
        private double amount;
        private String loanId;
        private String status;
    }
}
