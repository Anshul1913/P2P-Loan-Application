package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.CreditScoreHistoryDTO;

import java.util.List;

public interface CreditScoreHistoryService {
    List<CreditScoreHistoryDTO> getUserScoreHistory(String userId);
}

