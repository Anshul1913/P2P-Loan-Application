package peerToPeerLoan.Application.service;

public interface WalletService {
    Double getWalletBalance();

    String addMoney(Double amount);

    String withdrawMoney(Double amount);

}
