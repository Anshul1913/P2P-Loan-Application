package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import peerToPeerLoan.Application.entity.CreditScoreHistory;
import peerToPeerLoan.Application.entity.User;

import java.util.List;

public interface CreditScoreHistoryRepository extends JpaRepository<CreditScoreHistory, String> {
    List<CreditScoreHistory> findByUser(User user);
}

