package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.Transactions;
import peerToPeerLoan.Application.entity.User;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions,String> {
    List<Transactions> findByUser(User currentUser);
}
