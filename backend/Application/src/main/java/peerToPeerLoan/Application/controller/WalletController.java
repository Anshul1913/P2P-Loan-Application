package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.service.WalletService;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
    @Autowired
    private WalletService walletService;


    // Get current user's wallet balance
    @GetMapping("/balance")
    public ResponseEntity<Double> getWalletBalance(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(walletService.getWalletBalance());
    }

    // Add money to wallet (test/mock only)
    @PostMapping("/add")
    public ResponseEntity<String> addMoney(@RequestHeader("Authorization") String token,@RequestParam Double amount) {
        return ResponseEntity.ok(walletService.addMoney(amount));
    }

    // Withdraw money from wallet
    @PostMapping("/withdraw")
    public ResponseEntity<String> withdrawMoney(@RequestHeader("Authorization") String token,@RequestParam Double amount) {
        return ResponseEntity.ok(walletService.withdrawMoney(amount));

    }
}
