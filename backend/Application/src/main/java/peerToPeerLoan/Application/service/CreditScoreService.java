package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.CreditScoreDTO;
import peerToPeerLoan.Application.entity.User;

public interface CreditScoreService {
    CreditScoreDTO getCreditScoreForCurrentUser();
    CreditScoreDTO getCreditScoreByUserId(String userId);
    Integer recalculateScoreForCurrentUser();

    Integer calculateCreditScoreForUser(User user);
}

