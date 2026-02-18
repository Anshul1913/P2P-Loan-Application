package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.LoanRequestDTO;
import peerToPeerLoan.Application.dto.LoanSummaryDTO;

import java.util.List;

public interface LoanRequestService {
    List<LoanRequestDTO> getAvailableLoanRequests();

    LoanRequestDTO getLoanRequestById(String id);

    LoanSummaryDTO getLoanSummary(String id);

    List<LoanRequestDTO> getAllLoanRequests();

    List<LoanRequestDTO> getAllLoanRequests(String Status);

    String approveFunding(String fundingId);

    String rejectFunding(String fundingId);

    LoanRequestDTO createLoanRequest(LoanRequestDTO request);

    List<LoanRequestDTO> getLoanRequestsOfCurrentUser();

    String cancelLoanRequest(String id);
}
