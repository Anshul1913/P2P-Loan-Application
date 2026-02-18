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
public class ActiveLoanDTO {
    private String id;

    private String title;
    private LocalDateTime timestamp;
    private Double totalAmount;
    // Deductions for borrower
    private Double paidAmount;   // e.g., 3% of amountFunded
    private int intrestRate;        // e.g., 18% of processingFee
    private int emiLeft;
    private int totalEmi;
    private String lenderName; // optional: for display
    private String loanPurpose; // optional: for overview
    private String loanStatus; // optional: loan status at the time of funding

}
