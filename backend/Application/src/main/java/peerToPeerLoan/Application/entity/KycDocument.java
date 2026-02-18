package peerToPeerLoan.Application.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import jakarta.validation.constraints.Pattern;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.KycStatus;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class KycDocument  extends Auditable<String> implements Serializable {


    private String rejectReason;
    @Column(unique = true)
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format")
    private String panNumber;

    @Column(unique = true)
    @Pattern(regexp = "\\d{12}", message = "Aadhaar must be 12 digits")
    private String aadhaarNumber;
    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] panCardImage;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] selfieImage;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] aadhaarCardImage;

//    @Column(unique = true)
//    private String refId;// unique document id / number eg aadhar card number , pan card number etc

    @ManyToOne
    private User user;

    private boolean isVerified;
}
