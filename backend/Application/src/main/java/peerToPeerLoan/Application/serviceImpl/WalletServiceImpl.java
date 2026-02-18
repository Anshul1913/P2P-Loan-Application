package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.IllegalTransactionStateException;
import peerToPeerLoan.Application.entity.EMI;
import peerToPeerLoan.Application.entity.Transactions;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.entity.Wallet;
import peerToPeerLoan.Application.exception.InvalidTransactionException;
import peerToPeerLoan.Application.exception.ResourceNotFoundException;
import peerToPeerLoan.Application.repository.EmiRepository;
import peerToPeerLoan.Application.repository.TransactionRepository;
import peerToPeerLoan.Application.repository.WalletRepository;
import peerToPeerLoan.Application.service.UserService;
import peerToPeerLoan.Application.service.WalletService;
import peerToPeerLoan.Application.utils.constants.TransactionType;

import java.time.LocalDateTime;

@Service
public class WalletServiceImpl implements WalletService {
@Autowired
    private  WalletRepository walletRepository;
    @Autowired
private  TransactionRepository transactionRepository;
    @Autowired
    private  UserService userService;
    @Autowired
    private EmiRepository emiRepository;

    @Override
    public Double getWalletBalance() {
        User currentUser = userService.getCurrentUser();
        Wallet wallet = walletRepository.findByUser(currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));
        return wallet.getBalance();
    }

    @Override
    public String addMoney(Double amount) {
        if (amount <= 0) throw new InvalidTransactionException("Amount must be positive");

        User currentUser = userService.getCurrentUser();
        Wallet wallet = walletRepository.findByUser(currentUser).get();

        wallet.setBalance(wallet.getBalance() + amount);
        walletRepository.save(wallet);

        Transactions transaction = new Transactions();
        transaction.setUser(currentUser);
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.WALLET_TOP_UP);
        transaction.setDescription("Money added to wallet");
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return "Money added successfully.";
    }

    @Override
    public String withdrawMoney(Double amount) {
        if (amount <= 0) throw new IllegalTransactionStateException("Amount must be positive");

        User currentUser = userService.getCurrentUser();
        Wallet wallet = walletRepository.findByUser(currentUser).get();

        if (wallet.getBalance() < amount)
            throw new InvalidTransactionException("Insufficient balance");

        wallet.setBalance(wallet.getBalance() - amount);
        walletRepository.save(wallet);

        Transactions transaction = new Transactions();
        transaction.setUser(currentUser);
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.WALLET_WITHDRAWAL);
        transaction.setDescription("Money withdrawn from wallet");
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return "Money withdrawn successfully.";
    }


}
