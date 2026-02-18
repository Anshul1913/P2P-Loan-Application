package peerToPeerLoan.Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.FundingStatus;

import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class LoanFunding extends Auditable<String> implements Serializable {
    private LocalDateTime timestamp;
    // Amount lender agrees to fund (Principal sanctioned)
    private Double amountFunded;
    // Interest rate per month (%), used directly for EMI calculation
    private Double monthlyInterestRate;
    // Deductions for borrower
    private Double processingFee;   // e.g., 3% of amountFunded
    private Double gstOnFee;        // e.g., 18% of processingFee
    // Net amount borrower actually receives
    private Double netDisbursedAmount;
    @Enumerated(EnumType.STRING)
    private FundingStatus fundingStatus;
    @ManyToOne
    private LoanRequest loan;


    @ManyToOne
    private User lender;
}
