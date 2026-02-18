package peerToPeerLoan.Application.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import peerToPeerLoan.Application.config.Auditable;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Where(clause = "is_deleted = 0")
public class UserProfile extends Auditable<String> implements Serializable {

    @OneToOne
    @JoinColumn(nullable = false, unique = true)
    private User user;

    private String fullName;

    private LocalDate dateOfBirth;

    private String gender;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String occupation;

    private Double annualIncome;
}
