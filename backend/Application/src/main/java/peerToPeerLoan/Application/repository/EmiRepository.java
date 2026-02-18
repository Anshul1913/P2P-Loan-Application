package peerToPeerLoan.Application.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.dto.EmiDTO;
import peerToPeerLoan.Application.entity.EMI;

import java.util.List;

@Repository
public interface EmiRepository extends JpaRepository<EMI,String> {
    List<EMI> findByLoanFundingId(String loanFundingId);

    List<EMI> findByLoanFunding_Loan_Borrower_Id(String borrowerId);
    Page<EMI> findByLoanFunding_Loan_Borrower_Id(String borrowerId, Pageable pageable);
    List<EMI> findByLoanFunding_Loan_Borrower_IdOrderByDueDateAsc(String borrowerId);
}
