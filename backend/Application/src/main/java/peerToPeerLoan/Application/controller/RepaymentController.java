package peerToPeerLoan.Application.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.dto.RepaymentDTO;
import peerToPeerLoan.Application.service.RepaymentService;

import java.util.List;

@RestController
@RequestMapping("/api/repayments")
public class RepaymentController {
    @Autowired
    private RepaymentService repaymentService;

    // Get all EMIs for current borrower
    @GetMapping("/my")
    public ResponseEntity<List<RepaymentDTO>> getRepaymentsForBorrower(@RequestHeader("Authorization") String token ) {
        return ResponseEntity.ok(repaymentService.getRepaymentsForCurrentUser());
    }

    // Get EMI details by ID
    @GetMapping("/{id}")
    public ResponseEntity<RepaymentDTO> getRepaymentById(@RequestHeader("Authorization") String token ,
                                                         @PathVariable String id) {
        return ResponseEntity.ok(repaymentService.getRepaymentById(id));
    }

    // Mark EMI as paid
    @PostMapping("/{id}/pay")
    public ResponseEntity<String> markRepaymentAsPaid(@RequestHeader("Authorization") String token ,
                                                      @PathVariable String id) {
        return ResponseEntity.ok(repaymentService.markAsPaid(id));
    }

    // Auto-generate EMI schedule (admin/loan disbursement flow)
    @PostMapping("/generate/{loanId}")
    public ResponseEntity<String> generateEmiSchedule(@RequestHeader("Authorization") String token ,
                                                      @PathVariable String loanId) {
        return ResponseEntity.ok(repaymentService.generateRepaymentSchedule(loanId));
    }
    @GetMapping("/repayments/calculate-late-fees")
    public ResponseEntity<String> applyLateFeesToOverdueRepayments() {
        repaymentService.applyLateFeesToOverdueRepayments();
        return ResponseEntity.ok("Late fees applied to overdue EMIs.");
    }
    @GetMapping("/borrower/history")
    public ResponseEntity<List<RepaymentDTO>> getRepaymentHistory(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(repaymentService.getRepaymentsForCurrentUser());
    }
    @GetMapping("/lender/view")
    public ResponseEntity<List<RepaymentDTO>> getRepaymentsForCurrentLender(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(repaymentService.getRepaymentsForCurrentLender());
    }
}

