package peerToPeerLoan.Application.entity;


import jakarta.persistence.Entity;
import lombok.*;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Where(clause = "is_deleted = 0")
public class DropList extends Auditable<String> implements Serializable {
    private String labelKey;
    private String optionKey;
    private String optionValue;
}
