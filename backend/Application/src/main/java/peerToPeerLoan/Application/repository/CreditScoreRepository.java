package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.CreditScore;
import peerToPeerLoan.Application.entity.User;

import java.util.Optional;

@Repository
public interface CreditScoreRepository extends JpaRepository<CreditScore,String> {
    Optional<CreditScore> findByUser(User currentUser);
}
