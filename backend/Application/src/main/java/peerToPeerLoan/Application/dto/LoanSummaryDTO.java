package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanSummaryDTO {

    private String loanId;
    private Double totalRequestedAmount;
    private Double totalAmountFunded;
    private Double remainingAmount;
    private int totalFunders;
    private Double interestRate;
    private Integer durationMonths;

    private String borrowerId;
    private String borrowerName;

    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;

    private List<LoanFundingDTO> fundings; // List of lenders who funded this loan

}

