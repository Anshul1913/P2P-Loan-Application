package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmiDTO {
    private String id;
    private Double emiAmount;
    private LocalDate dueDate;
    private String status;
    private Boolean isPaid;
    private LocalDate paidDate;
    private String loanTitle;
    private String lenderName;
}

