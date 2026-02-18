package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.LoanRequestDTO;
import peerToPeerLoan.Application.dto.LoanSummaryDTO;
import peerToPeerLoan.Application.service.LoanRequestService;

import java.util.List;

@RestController
@RequestMapping("/api/loan-request")
public class LoanRequestController {
    @Autowired
    private LoanRequestService loanRequestService;

//    // ---------------------------- LENDER APIs ----------------------------
//
    @GetMapping("/available")
    public ResponseEntity<List<LoanRequestDTO>> getAvailableLoanRequests(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(loanRequestService.getAvailableLoanRequests());
    }
//
//    @PostMapping("/{loanId}/fund")
//    @PreAuthorize("hasRole('LENDER')")
//    public ResponseEntity<String> fundLoan(@PathVariable String loanId, @RequestBody FundLoanDTO fundDTO) {
//        return ResponseEntity.ok(loanRequestService.fundLoan(loanId, fundDTO));
//    }
//
//    @GetMapping("/funded-by-me")
//    @PreAuthorize("hasRole('LENDER')")
//    public ResponseEntity<List<LoanFundingDTO>> getMyFundedLoans() {
//        return ResponseEntity.ok(loanRequestService.getFundedLoansByCurrentLender());
//    }
//
//    @PutMapping("/funding/{fundingId}/cancel")
//    @PreAuthorize("hasRole('LENDER')")
//    public ResponseEntity<String> cancelFunding(@PathVariable String fundingId) {
//        return ResponseEntity.ok(loanRequestService.cancelFunding(fundingId));
//    }
//
    @GetMapping("/{id}/summary")
    public ResponseEntity<LoanSummaryDTO> getLoanSummary(@RequestHeader("Authorization") String token,@PathVariable String id) {
        return ResponseEntity.ok(loanRequestService.getLoanSummary(id));
    }
//    // ---------------------------- ADMIN APIs ----------------------------

    @GetMapping("/admin/loan-requests")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<LoanRequestDTO>> getAllLoanRequests(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(loanRequestService.getAllLoanRequests());
    }

    @PutMapping("/admin/funding/{fundingId}/approve")
    public ResponseEntity<String> approveFunding(@RequestHeader("Authorization") String token,@PathVariable String fundingId) {
        return ResponseEntity.ok(loanRequestService.approveFunding(fundingId));
    }

    @PutMapping("/admin/funding/{fundingId}/reject")
    public ResponseEntity<String> rejectFunding(@RequestHeader("Authorization") String token ,
                                                @PathVariable String fundingId) {
        return ResponseEntity.ok(loanRequestService.rejectFunding(fundingId));
    }

    // Create a new loan request
    @PostMapping("/create")
    public ResponseEntity<LoanRequestDTO> createLoanRequest(@RequestHeader("Authorization") String token ,
                                                            @RequestBody LoanRequestDTO request) {
        return ResponseEntity.ok(loanRequestService.createLoanRequest(request));
    }

    // View all loan requests (optional filter: only open)
    @GetMapping("/all")
    public ResponseEntity<List<LoanRequestDTO>> getAllLoanRequests(@RequestHeader("Authorization") String token ,
                                                                   @RequestParam(required = false) String Open) {
        return ResponseEntity.ok(loanRequestService.getAllLoanRequests(Open));
    }

    // View loan requests of current borrower
    @GetMapping("/my")
    public ResponseEntity<List<LoanRequestDTO>> getMyLoanRequests(@RequestHeader("Authorization") String token ) {
        return ResponseEntity.ok(loanRequestService.getLoanRequestsOfCurrentUser());
    }

    // Get loan request by ID
    @GetMapping("/{id}")
    public ResponseEntity<LoanRequestDTO> getLoanRequestById(@RequestHeader("Authorization") String token ,
                                                             @PathVariable String id) {
        return ResponseEntity.ok(loanRequestService.getLoanRequestById(id));
    }


    // Cancel loan request
    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelLoanRequest(@RequestHeader("Authorization") String token ,
                                                    @PathVariable String id) {
        return ResponseEntity.ok(loanRequestService.cancelLoanRequest(id));
    }

}
