package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.CreditScoreHistoryDTO;
import peerToPeerLoan.Application.service.CreditScoreHistoryService;
import peerToPeerLoan.Application.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/credit-score-history")
public class CreditScoreHistoryController {

    @Autowired
    private CreditScoreHistoryService historyService;
    @Autowired
    private UserService userService;
    @GetMapping("/{userId}")
    public ResponseEntity<List<CreditScoreHistoryDTO>> getHistory(@RequestHeader("Authorization") String token,@PathVariable String userId) {
        return ResponseEntity.ok(historyService.getUserScoreHistory(userId));
    }
    @GetMapping()
    public ResponseEntity<List<CreditScoreHistoryDTO>> getHistoryOfCurrentUser(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(historyService.getUserScoreHistory(userService.getCurrentUser().getId()));
    }
}

