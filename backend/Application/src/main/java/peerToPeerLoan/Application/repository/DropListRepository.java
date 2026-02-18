package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.DropList;
import peerToPeerLoan.Application.entity.User;
@Repository
public interface DropListRepository extends JpaRepository<DropList,String> {
}
