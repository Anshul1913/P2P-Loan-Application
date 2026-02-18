package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RepaymentDTO {
    private String id;

    private String loanId;              // Associated loan request ID
    private String borrowerId;          // Borrower user ID

    private Double amount;              // EMI amount
    private LocalDate dueDate;          // Due date of EMI
    private String status;
    private Boolean isPaid;             // Whether this EMI is paid
    private LocalDate paidDate;         // When it was paid (optional)

    private Double lateFee;             // Late fee (if any)
}
