package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.entity.LoanFunding;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.repository.LoanFundingRepository;
import peerToPeerLoan.Application.repository.LoanRequestRepository;
import peerToPeerLoan.Application.service.LoanAgreementService;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;


import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Service
public class LoanAgreementServiceImpl implements LoanAgreementService {
    @Autowired
    private LoanRequestRepository loanRequestRepository;
    @Autowired
    private LoanFundingRepository loanFundingRepository;


    @Override
    public byte[] generateLoanAgreementPdf(String loanId) {
        LoanRequest loan = loanRequestRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        List<LoanFunding> fundings = loanFundingRepository.findByLoan(loan);

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            document.add(new Paragraph("Loan Agreement"));
            document.add(new Paragraph("Loan ID: " + loanId));
            document.add(new Paragraph("Amount: ₹" + loan.getAmount()));
            document.add(new Paragraph("Duration: " + loan.getDurationMonths() + " months"));
            document.add(new Paragraph("Borrower: " + loan.getBorrower().getName()));

            document.add(new Paragraph("Funded By:"));
            for (LoanFunding funding : fundings) {
                document.add(new Paragraph("- " + funding.getLender().getName() + " → ₹" + funding.getAmountFunded()));
            }

            document.add(new Paragraph("Date: " + LocalDate.now()));
            document.close();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }

        return out.toByteArray();
    }

}
