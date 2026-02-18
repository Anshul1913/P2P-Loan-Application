package peerToPeerLoan.Application.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.TransactionDTO;
import peerToPeerLoan.Application.service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Get all transactions for current user
    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(transactionService.getAllTransactionsForCurrentUser());
    }

    // Optional: Get transaction by ID
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(@RequestHeader("Authorization") String token,@PathVariable String id) {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }
}

