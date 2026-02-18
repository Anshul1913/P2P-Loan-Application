package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoanFundingDTO {
    private String id;

    private Double amountFunded;
    private LocalDateTime timestamp;

    // Interest rate per month (%), used directly for EMI calculation
    private Double monthlyInterestRate;

    // Deductions for borrower
    private Double processingFee;   // e.g., 3% of amountFunded
    private Double gstOnFee;        // e.g., 18% of processingFee

    // Net amount borrower actually receives
    private Double netDisbursedAmount;

    private String loanId;
    private String lenderId;
    private String lenderName; // optional: for display

    private String loanPurpose; // optional: for overview

    private String loanStatus; // optional: loan status at the time of funding
}

