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
import peerToPeerLoan.Application.utils.constants.TransactionType;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class Transactions extends Auditable<String> implements Serializable {
    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private String description;

    private LocalDateTime timestamp;
    @ManyToOne
    private User user;
}
