package peerToPeerLoan.Application.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.LoanStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class LoanRequest  extends Auditable<String> implements Serializable {

    private Double amount;   //total requested
    private String title;
    private Double maxInterestRateAcceptable;
    private Integer durationMonths;
    private String purpose;
    @Enumerated(EnumType.STRING)
    private LoanStatus status; // OPEN, FUNDED, REPAID, REJECTED , PARTIALLY_FUNDED,
    private Double totalFundedAmount = 0.0;
    private Boolean isFullyFunded = false;
    private LocalDateTime expiryDate; // ⬅️ New field for borrower to set deadline
    @ManyToOne
    private User borrower;
}
