package peerToPeerLoan.Application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class KycDocumentDTO {
    private String id;
    private String panNumber;
    private String aadhaarNumber;
    private String kycStatus;
    private String panCardImage;
    private String selfieImage;
    private String aadhaarCardImage;
    private String userName;
    private String roleType;
    private Date submitDate;
    private boolean isVerified;
}
