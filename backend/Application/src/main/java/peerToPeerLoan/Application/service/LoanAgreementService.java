package peerToPeerLoan.Application.service;

public interface LoanAgreementService {
    byte[] generateLoanAgreementPdf(String loanId);
}
