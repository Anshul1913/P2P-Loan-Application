package peerToPeerLoan.Application.service;

import peerToPeerLoan.Application.dto.TransactionDTO;

import java.util.List;

public interface TransactionService {
    List<TransactionDTO> getAllTransactionsForCurrentUser();

    TransactionDTO getTransactionById(String id);
}
