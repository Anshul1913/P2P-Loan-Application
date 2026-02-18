package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.RepaymentDTO;

import java.util.List;

public interface RepaymentService {
    List<RepaymentDTO> getRepaymentsForCurrentUser();
    RepaymentDTO getRepaymentById(String id);
    String markAsPaid(String id);
    String generateRepaymentSchedule(String loanId);

    void applyLateFeesToOverdueRepayments();

    List<RepaymentDTO> getRepaymentsForCurrentLender();
}
