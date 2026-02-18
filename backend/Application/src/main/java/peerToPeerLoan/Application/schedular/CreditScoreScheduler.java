package peerToPeerLoan.Application.schedular;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import peerToPeerLoan.Application.entity.User;
import peerToPeerLoan.Application.repository.UserRepository;
import peerToPeerLoan.Application.service.CreditScoreService;

import java.util.List;

@Component
public class CreditScoreScheduler {
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  CreditScoreService creditScoreService;


    @Scheduled(cron = "0 0 0 * * *") // Every day at 00:00
    public void updateAllUserScores() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            creditScoreService.calculateCreditScoreForUser(user);
        }
        System.out.println("Daily credit score update completed.");
    }
}

