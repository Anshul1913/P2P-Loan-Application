package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import peerToPeerLoan.Application.utils.constants.CreditGrade;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditScoreDTO {
    private String id;
    private String userId;
    private Integer score; // Between 0 and 900
    private LocalDate lastEvaluated;
    private String remarks;
    private CreditGrade grade;
}

