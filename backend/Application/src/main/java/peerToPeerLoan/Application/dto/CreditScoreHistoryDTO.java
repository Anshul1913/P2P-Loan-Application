package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditScoreHistoryDTO {
    private String id;
    private String userId;
    private Integer oldScore;
    private Integer newScore;
    private String reason;
    private LocalDateTime updatedAt;
}

