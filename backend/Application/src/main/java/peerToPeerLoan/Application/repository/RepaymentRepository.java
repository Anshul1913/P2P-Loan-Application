package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.entity.Repayment;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.utils.constants.RepaymentStatus;

import java.util.Arrays;
import java.util.List;

@Repository
public interface RepaymentRepository extends JpaRepository<Repayment,String> {
    List<Repayment> findByLoan(LoanRequest loan);

    List<Repayment> findByStatus(RepaymentStatus repaymentStatus);


    List<Repayment> findByLoan_Borrower(User user);
}
