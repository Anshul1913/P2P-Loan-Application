package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopFunderDTO {
    private String lenderName;
    private Double totalFunded;
}