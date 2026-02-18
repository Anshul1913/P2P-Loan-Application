package peerToPeerLoan.Application.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import peerToPeerLoan.Application.service.LoanAgreementService;

@RestController
@RequestMapping("/api/loan-agreements")
public class LoanAgreementController {

    private final LoanAgreementService loanAgreementService;

    public LoanAgreementController(LoanAgreementService loanAgreementService) {
        this.loanAgreementService = loanAgreementService;
    }

    @GetMapping("/download/{loanId}")
    public ResponseEntity<byte[]> downloadAgreement(@RequestHeader("Authorization") String token,@PathVariable String loanId) {
        byte[] pdfBytes = loanAgreementService.generateLoanAgreementPdf(loanId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename("Loan_Agreement_" + loanId + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/view/{loanId}")
    public ResponseEntity<byte[]> viewAgreement(@RequestHeader("Authorization") String token,@PathVariable String loanId) {
        byte[] pdfBytes = loanAgreementService.generateLoanAgreementPdf(loanId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.inline()
                .filename("Loan_Agreement_" + loanId + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
