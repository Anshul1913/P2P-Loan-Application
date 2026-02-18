package peerToPeerLoan.Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import lombok.*;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.CreditGrade;

import java.io.Serializable;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Where(clause = "is_deleted = 0")
public class CreditScore extends Auditable<String> implements Serializable {
    @OneToOne
    private User user;

    private Integer score = 600; // Range: 0–900

    private LocalDate lastEvaluated;

    private String remarks; // Optional: e.g., "Low due to EMI default"

    @Enumerated(EnumType.STRING)
    private CreditGrade grade; // EXCELLENT, GOOD, FAIR, POOR
}

