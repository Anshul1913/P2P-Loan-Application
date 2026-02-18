package peerToPeerLoan.Application.schedular;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import peerToPeerLoan.Application.service.RepaymentService;

@Component
public class RepaymentScheduler {
    @Autowired
    private RepaymentService repaymentService;


    // Runs every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void applyLateFees() {
        repaymentService.applyLateFeesToOverdueRepayments();
    }
}