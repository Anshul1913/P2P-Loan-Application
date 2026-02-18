package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.AuthResponse;
import peerToPeerLoan.Application.dto.LoginRequestDTO;
import peerToPeerLoan.Application.dto.SignupRequestDTO;
import peerToPeerLoan.Application.entity.User;

public interface UserService {
    User createUser(SignupRequestDTO request);
    User getCurrentUser();
    AuthResponse login(LoginRequestDTO request);

    String getUserDetail();
}
