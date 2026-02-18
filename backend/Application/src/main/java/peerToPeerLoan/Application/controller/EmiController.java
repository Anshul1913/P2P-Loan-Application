package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.EmiDashboardDTO;
import peerToPeerLoan.Application.entity.EMI;
import peerToPeerLoan.Application.service.EmiService;

import java.util.List;

@RestController
@RequestMapping("/api/emi")
public class EmiController {
    @Autowired
    private EmiService emiService;

    // ✅ Generate EMI schedule for a given loan funding
    @PostMapping("/generate/{loanFundingId}")
    public ResponseEntity<String> generateEMISchedule(@RequestHeader("Authorization") String token,@PathVariable String loanFundingId) {
        emiService.generateEmiSchedule(loanFundingId);
        return ResponseEntity.ok("EMI schedule generated successfully");
    }

    @GetMapping
    public ResponseEntity<?> getAllEmiOfCurrentUser(@RequestHeader("Authorization") String token, Pageable pageable) {
        System.out.println(token);
      return  ResponseEntity.ok(emiService.getAllEmiOfCurrentUser(pageable));
    }
    @GetMapping("/dashboard")
    public ResponseEntity<EmiDashboardDTO> getDashboard(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(emiService.getDashboard());
    }
    // ✅ Get all EMIs for a specific loan funding
    @GetMapping("/funding/{loanFundingId}")
    public ResponseEntity<?> getEmisByLoanFunding(@RequestHeader("Authorization") String token,@PathVariable String loanFundingId) {
        return ResponseEntity.ok(emiService.getEmisByLoanFunding(loanFundingId));
    }

    // ✅ Mark EMI as paid
    @PutMapping("/{emiId}/pay")
    public ResponseEntity<String> payEmi(@RequestHeader("Authorization") String token,@PathVariable String emiId) {
        emiService.markEmiAsPaid(emiId);
        return ResponseEntity.ok("EMI marked as paid");
    }

    @PostMapping("/pay-now/{emiId}")
    public ResponseEntity<?> payNow(@RequestHeader("Authorization") String token,@RequestParam Double amount, @PathVariable String emiId) {
            return ResponseEntity.ok(emiService.payEmi(emiId,amount));

    }
}
