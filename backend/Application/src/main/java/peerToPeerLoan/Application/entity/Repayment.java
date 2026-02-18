package peerToPeerLoan.Application.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.RepaymentStatus;

import java.io.Serializable;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class Repayment extends Auditable<String> implements Serializable {

    private LocalDate dueDate;                 // When this EMI is due
    private Double amount;                     // EMI amount

    @Enumerated(EnumType.STRING)
    private RepaymentStatus status;            // PENDING, PAID, LATE, DEFAULTED
    private LocalDate paidDate;                // When the EMI was actually paid
    private Double lateFee = 0.0;              // Any penalty amount if paid late
    @ManyToOne
    private LoanRequest loan;                  // Link to which loan this EMI belongs
    @ManyToOne
    private User borrower;                     // Who needs to pay this EMI
    // helper method
    public boolean isOverdue() {
        return this.status == RepaymentStatus.PENDING && LocalDate.now().isAfter(dueDate);
    }
}

