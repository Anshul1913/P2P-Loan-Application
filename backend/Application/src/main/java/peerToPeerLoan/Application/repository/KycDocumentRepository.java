package peerToPeerLoan.Application.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.DropList;
import peerToPeerLoan.Application.entity.KycDocument;
import peerToPeerLoan.Application.entity.User;

import java.util.Optional;

@Repository
public interface KycDocumentRepository extends JpaRepository<KycDocument,String> {
    Optional<KycDocument> findByUser(User user);
    Optional<KycDocument> findByUserId(String userId);
}

