package peerToPeerLoan.Application.dataInitializer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.entity.Wallet;
import peerToPeerLoan.Application.repository.RoleRepository;
import peerToPeerLoan.Application.repository.UserRepository;
import peerToPeerLoan.Application.repository.WalletRepository;
import peerToPeerLoan.Application.utils.constants.AccountStatus;
import peerToPeerLoan.Application.utils.constants.AppConstants;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        insertRoleIfNotExists("ADMIN");
        insertRoleIfNotExists("BORROWER");
        insertRoleIfNotExists("LENDER");


        // Check if admin already exists
        if (!userRepository.existsByEmail("admin@p2ploan.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@p2ploan.com");
            admin.setUsername("admin@p2ploan.com");
            admin.setPassword(passwordEncoder.encode("admin123")); // Store hashed password
            admin.setRole(roleRepository.findByName(AppConstants.ADMIN).get()); // Use your Role enum
            admin.setStatus(AccountStatus.ACTIVE); // or ACTIVE

            admin=userRepository.save(admin);

            Wallet wallet = new Wallet();
            wallet.setBalance(0.0);
            wallet.setUser(admin);
            walletRepository.save(wallet);
            System.out.println("✅ Admin user created.");
        } else {
            System.out.println("✅ Admin user already exists.");
        }
    }
    private void insertRoleIfNotExists(String roleName) {
        if (!roleRepository.existsByName(roleName)) {
            peerToPeerLoan.Application.entity.Role role = new peerToPeerLoan.Application.entity.Role();
            role.setName(roleName);
            roleRepository.save(role);
            System.out.println("✅ Role '" + roleName + "' inserted.");
        }
    }
}

