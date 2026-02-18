package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.LoanFundingDTO;
import peerToPeerLoan.Application.service.LoanFundedService;

import java.util.List;

@RestController
@RequestMapping("/api/loan-funding")
public class LoanFundingController {
    @Autowired
    private LoanFundedService loanFundingService;

    // Fund a loan (lender offers funding)
    @PostMapping("/fund")
    public ResponseEntity<LoanFundingDTO> fundLoan(@RequestHeader("Authorization") String token,@RequestBody LoanFundingDTO fundingRequest) {
        return ResponseEntity.ok(loanFundingService.fundLoan(fundingRequest));
    }
    @GetMapping("/top-funders")
    public ResponseEntity<?> getTopFunders(@RequestHeader("Authorization") String token,@RequestParam(defaultValue = "3") int limit) {
        return ResponseEntity.ok(loanFundingService.getTopFunders(limit));
    }
    @GetMapping("/active-loans")
    public ResponseEntity<?> getActiveLoans(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(loanFundingService.getActiveLoans());
    }
    // Get all fundings for a specific loan
    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<LoanFundingDTO>> getFundingsByLoanId(@RequestHeader("Authorization") String token ,
                                                                    @PathVariable String loanId) {
        return ResponseEntity.ok(loanFundingService.getFundingsByLoanId(loanId));
    }

    // View lender's own fundings
    @GetMapping("/my")
    public ResponseEntity<List<LoanFundingDTO>> getMyFundings(@RequestHeader("Authorization") String token ) {
        return ResponseEntity.ok(loanFundingService.getFundingsOfCurrentLender());
    }

    // Admin approval/rejection (optional feature)
    @PutMapping("/approve/{fundingId}")
    public ResponseEntity<String> approveFunding(@RequestHeader("Authorization") String token ,
                                                 @PathVariable String fundingId) {
        return ResponseEntity.ok(loanFundingService.approveFunding(fundingId));
    }

    @PutMapping("/reject/{fundingId}")
    public ResponseEntity<String> rejectFunding(@RequestHeader("Authorization") String token ,
                                                @PathVariable String fundingId) {
        return ResponseEntity.ok(loanFundingService.rejectFunding(fundingId));
    }
}
