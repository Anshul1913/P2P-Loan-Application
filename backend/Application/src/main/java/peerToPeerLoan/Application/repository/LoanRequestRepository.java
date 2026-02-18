package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.utils.constants.LoanStatus;

import java.util.List;

@Repository
public interface LoanRequestRepository extends JpaRepository<LoanRequest,String> {
    List<LoanRequest> findByStatus(LoanStatus loanStatus);

    List<LoanRequest> findByBorrower(User user);
    List<LoanRequest> findByBorrower_Id(String borrowerId);
    int countByBorrowerAndStatus(User user,LoanStatus loanStatus);
}

