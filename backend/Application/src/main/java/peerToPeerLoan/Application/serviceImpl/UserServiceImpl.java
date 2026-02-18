package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.AuthResponse;
import peerToPeerLoan.Application.dto.LoginRequestDTO;
import peerToPeerLoan.Application.dto.SignupRequestDTO;
import peerToPeerLoan.Application.entity.CreditScore;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.entity.Wallet;
import peerToPeerLoan.Application.exception.IllegalArgumentException;
import peerToPeerLoan.Application.repository.CreditScoreRepository;
import peerToPeerLoan.Application.repository.RoleRepository;
import peerToPeerLoan.Application.repository.UserRepository;
import peerToPeerLoan.Application.repository.WalletRepository;
import peerToPeerLoan.Application.service.UserService;
import peerToPeerLoan.Application.utils.constants.AccountStatus;
import peerToPeerLoan.Application.utils.constants.AppConstants;
import peerToPeerLoan.Application.utils.constants.Role;
import peerToPeerLoan.Application.utils.security.JWTHelper;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private JWTHelper helper;
    @Autowired
    private CreditScoreRepository creditScoreRepository;

    @Override
    public User createUser(SignupRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already in use please sign in ");
        }
        if (request.getPassword() == null) {
            throw new IllegalArgumentException("password is required");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setUsername(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
            if (request.getRole().equals(Role.BORROWER)){

            user.setRole(roleRepository.findByName(AppConstants.BORROWER).get());
        }
        if (request.getRole().equals(Role.LENDER)){

            user.setRole(roleRepository.findByName(AppConstants.LENDER).get());
        }
        user.setStatus(AccountStatus.PENDING);

        user=userRepository.save(user);
        CreditScore creditScore = new CreditScore();
        creditScore.setUser(user);
        creditScore.setScore(500);
        creditScoreRepository.save(creditScore);
        Wallet wallet = new Wallet();
        wallet.setBalance(0.0);
        wallet.setUser(user);
        walletRepository.save(wallet);
        return null;
    }

    @Override
    public User getCurrentUser() {
        System.out.println("Authenticated username from SecurityContext: " +
                SecurityContextHolder.getContext().getAuthentication().getName());
        return userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
    }

    @Override
    public AuthResponse login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        String jwtToken = helper.generateToken(userDetails);


        return AuthResponse.builder().jwtToken(jwtToken).build();
    }

    @Override
    public String getUserDetail() {
        return getCurrentUser().getName();
    }
}
