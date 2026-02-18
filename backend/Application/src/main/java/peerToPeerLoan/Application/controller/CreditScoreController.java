package peerToPeerLoan.Application.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.CreditScoreDTO;
import peerToPeerLoan.Application.service.CreditScoreService;

@RestController
@RequestMapping("/api/credit-score")
public class CreditScoreController {
    @Autowired
    private CreditScoreService creditScoreService;

    // Get credit score for current user
    @GetMapping
    public ResponseEntity<CreditScoreDTO> getCurrentUserScore(@RequestHeader("Authorization") String token) {
         return ResponseEntity.ok(creditScoreService.getCreditScoreForCurrentUser());
    }

    // Admin or internal use: Get credit score for specific user
    @GetMapping("/{userId}")
    public ResponseEntity<CreditScoreDTO> getScoreByUserId(@RequestHeader("Authorization") String token,@PathVariable String userId) {
        return ResponseEntity.ok(creditScoreService.getCreditScoreByUserId(userId));
    }

    // Optional: Force recalculation for current user
    @PostMapping("/recalculate")
    public ResponseEntity<?> recalculateForCurrentUser(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(creditScoreService.recalculateScoreForCurrentUser());
    }
}

