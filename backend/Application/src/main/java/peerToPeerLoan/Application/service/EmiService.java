package peerToPeerLoan.Application.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import peerToPeerLoan.Application.dto.EmiDTO;
import peerToPeerLoan.Application.dto.EmiDashboardDTO;
import peerToPeerLoan.Application.dto.PayEmiDTO;
import peerToPeerLoan.Application.entity.EMI;

import java.util.List;

public interface EmiService {
    void generateEmiSchedule(String loanFundingId);

    List<EmiDTO> getEmisByLoanFunding(String loanFundingId);

    void markEmiAsPaid(String emiId);

    Page<EmiDTO> getAllEmiOfCurrentUser(Pageable pageable);

    EmiDashboardDTO getDashboard();

    PayEmiDTO payEmi(String emiId, Double amount);
}
