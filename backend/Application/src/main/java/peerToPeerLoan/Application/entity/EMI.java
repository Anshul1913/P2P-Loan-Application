package peerToPeerLoan.Application.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.EmiStatus;
import peerToPeerLoan.Application.utils.constants.RepaymentStatus;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class EMI  extends Auditable<String> implements Serializable {

    private Double emiAmount;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private Double lateFee = 0.0;              // Any penalty amount if paid late
    @ManyToOne
    private LoanRequest loanRequest;
    @Enumerated(EnumType.STRING)
    private EmiStatus status; // PENDING, PAID, OVERDUE
    @ManyToOne
    private LoanFunding loanFunding; // link to the lender's funding for this loan
    public boolean isOverdue() {
        return this.status == EmiStatus.PENDING && LocalDate.now().isAfter(dueDate);
    }
}
