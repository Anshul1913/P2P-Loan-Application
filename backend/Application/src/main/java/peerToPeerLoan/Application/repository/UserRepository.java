package peerToPeerLoan.Application.repository;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    @Modifying
    @Transactional
    @Query("UPDATE User c SET c.isDeleted = true WHERE c.id = :id")
    String markAsDeleted(String id);

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
