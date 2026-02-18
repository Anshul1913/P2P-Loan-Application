package peerToPeerLoan.Application.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import peerToPeerLoan.Application.utils.constants.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequestDTO {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Role role; // BORROWER or LENDER
}
