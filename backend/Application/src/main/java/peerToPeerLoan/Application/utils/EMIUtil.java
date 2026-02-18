package peerToPeerLoan.Application.utils;

public class EMIUtil {

    public static double calculateEMI(double principal, double monthlyRate, int durationMonths) {
         monthlyRate = (monthlyRate / 100) ;
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, durationMonths)) /
                (Math.pow(1 + monthlyRate, durationMonths) - 1);
    }

}

