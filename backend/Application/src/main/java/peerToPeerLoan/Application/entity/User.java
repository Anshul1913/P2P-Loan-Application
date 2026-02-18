package peerToPeerLoan.Application.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import peerToPeerLoan.Application.config.Auditable;
import peerToPeerLoan.Application.utils.constants.AccountStatus;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "is_deleted = 0")
@Data
public class User extends Auditable<String> implements Serializable, UserDetails {
    private String name;
    private String phone;
private String username;
private String password;
private String email;
    @Enumerated(EnumType.STRING)
private AccountStatus status;

    @ManyToOne
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
