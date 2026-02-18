package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.ActiveLoanDTO;
import peerToPeerLoan.Application.dto.LoanFundingDTO;
import peerToPeerLoan.Application.dto.TopFunderDTO;

import java.util.List;

public interface LoanFundedService {
    List<LoanFundingDTO> getFundingsByLoanId(String loanId);

    LoanFundingDTO fundLoan(LoanFundingDTO fundingRequest);

    List<LoanFundingDTO> getFundingsOfCurrentLender();

    String approveFunding(String fundingId);

    String rejectFunding(String fundingId);

    List<TopFunderDTO> getTopFunders(int limit);

    List<ActiveLoanDTO> getActiveLoans();
}
