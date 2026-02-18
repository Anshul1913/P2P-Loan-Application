package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanRequestDTO {
    private String id;

    private Double amount;
    private Double maxInterestRateAcceptable;
    private Integer durationMonths; // in months
    private String purpose;
    private String title;
    private LocalDateTime expiryDate;
    private Double totalFundedAmount;
    private String borrowerId;
    private String borrowerName; // optional: for display
    private String status; // e.g., OPEN, FUNDED, REPAID, REJECTED
    private Integer score;
    private Double monthlyEmi;
    private Integer emiPaid;
    private Integer totalEmi;
    private LocalDate nextEmiDate;
    private Double outstanding;
}

