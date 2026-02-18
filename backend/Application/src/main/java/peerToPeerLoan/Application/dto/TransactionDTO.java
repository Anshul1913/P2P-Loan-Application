package peerToPeerLoan.Application.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransactionDTO {
    private String id;
    private String userId;
    private String type; // TransactionType enum
    private Double amount;
    private String description;
    private LocalDateTime timestamp;
}

