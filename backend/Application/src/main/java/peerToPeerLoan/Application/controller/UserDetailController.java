package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import peerToPeerLoan.Application.dto.TransactionDTO;
import peerToPeerLoan.Application.service.TransactionService;
import peerToPeerLoan.Application.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user-detail")
public class UserDetailController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserDetail(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getUserDetail());
    }


}
