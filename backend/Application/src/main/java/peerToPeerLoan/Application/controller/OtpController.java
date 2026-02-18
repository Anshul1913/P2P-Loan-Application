package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import peerToPeerLoan.Application.serviceImpl.EmailServiceImpl;
import peerToPeerLoan.Application.serviceImpl.OtpService;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailServiceImpl emailService;

//    @PostMapping("/send")
//    public ResponseEntity<String> sendOtp(@RequestParam String userId, @RequestParam String email) {
//        String otp = otpService.generateOtp(userId);
//        emailService.sendSimpleMail(email, "Your OTP Code", "Your OTP is: " + otp);
//        return ResponseEntity.ok("OTP sent to email");
//    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam String userId, @RequestParam String otp) {
        boolean success = otpService.validateOtp(userId, otp);
        return success ? ResponseEntity.ok("OTP verified")
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
    }
}

