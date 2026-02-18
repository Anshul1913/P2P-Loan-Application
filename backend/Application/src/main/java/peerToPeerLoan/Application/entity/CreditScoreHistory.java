package peerToPeerLoan.Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;

import java.io.Serializable;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Where(clause = "is_deleted = 0")
public class CreditScoreHistory extends Auditable<String> implements Serializable {

    @ManyToOne
    private User user;

    private Integer oldScore;
    private Integer newScore;
    private String reason; // e.g. "Loan repaid", "Late payment", "Manual adjustment"

    private LocalDateTime updatedAt;
}

