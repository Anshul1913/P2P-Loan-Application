package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import peerToPeerLoan.Application.dto.TransactionDTO;
import peerToPeerLoan.Application.entity.Transactions;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.repository.TransactionRepository;
import peerToPeerLoan.Application.service.TransactionService;
import peerToPeerLoan.Application.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {
    @Autowired
    private  TransactionRepository transactionRepository;
    @Autowired
    private  UserService userService;

    @Override
    public List<TransactionDTO> getAllTransactionsForCurrentUser() {
        User currentUser = userService.getCurrentUser();
        List<Transactions> transactions = transactionRepository.findByUser(currentUser);
        return transactions.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDTO getTransactionById(String id) {
        Transactions tx = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        return toDTO(tx);
    }

    private TransactionDTO toDTO(Transactions transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setId(transaction.getId());
        dto.setAmount(transaction.getAmount());
        dto.setUserId(transaction.getUser().getId());
        dto.setDescription(transaction.getDescription());
        dto.setTimestamp(transaction.getTimestamp());
        dto.setType(transaction.getTransactionType().toString());
        return dto;
    }
}
