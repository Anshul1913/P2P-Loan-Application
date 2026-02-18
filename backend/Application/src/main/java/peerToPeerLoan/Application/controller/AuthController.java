package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import peerToPeerLoan.Application.dto.LoginRequestDTO;
import peerToPeerLoan.Application.dto.SignupRequestDTO;
import peerToPeerLoan.Application.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup-borrower")
    public ResponseEntity<?> registerBorrower(@RequestBody SignupRequestDTO request) {
        System.out.println(request);
        return ResponseEntity.ok(userService.createUser(request));
    }
    @PostMapping("/signup-lender")
    public ResponseEntity<?> registerLender(@RequestBody SignupRequestDTO request) {
        return ResponseEntity.ok(userService.createUser(request));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        System.out.println("called");
        return ResponseEntity.ok(userService.login(request));
    }
}
