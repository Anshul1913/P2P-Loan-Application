package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.entity.Wallet;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,String> {
    Optional<Wallet> findByUser(User currentUser);

    Optional<Wallet> findByUserId(String id);
}
