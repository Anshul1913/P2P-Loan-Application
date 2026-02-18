package peerToPeerLoan.Application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import peerToPeerLoan.Application.entity.Role;
import peerToPeerLoan.Application.entity.User;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {

    Optional<Role> findByName(String name);
    boolean existsByName(String name);
}
