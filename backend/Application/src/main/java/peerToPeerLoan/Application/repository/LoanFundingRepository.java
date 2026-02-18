package peerToPeerLoan.Application.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.DropList;
import peerToPeerLoan.Application.entity.LoanFunding;
import peerToPeerLoan.Application.entity.LoanRequest;
import peerToPeerLoan.Application.entity.User;

import java.util.List;

@Repository
public interface LoanFundingRepository extends JpaRepository<LoanFunding,String> {

    List<LoanFunding> findByLoan(LoanRequest loan);

    List<LoanFunding> findByLender(User lender);

    @Query("SELECT lf.lender.name, SUM(lf.amountFunded) as totalFunded " +
            "FROM LoanFunding lf " +
            "GROUP BY lf.lender.name " +
            "ORDER BY totalFunded DESC")
    List<Object[]> findTopFunders(Pageable pageable);
}

