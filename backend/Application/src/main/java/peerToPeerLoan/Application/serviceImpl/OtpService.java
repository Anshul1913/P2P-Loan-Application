package peerToPeerLoan.Application.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
public class OtpService {

    private final StringRedisTemplate redisTemplate;

    @Autowired
    public OtpService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateOtp(String userId) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        redisTemplate.opsForValue().set("otp:" + userId, otp, Duration.ofMinutes(5));
        return otp;
    }

    public boolean validateOtp(String userId, String inputOtp) {
        String key = "otp:" + userId;
        String storedOtp = redisTemplate.opsForValue().get(key);
        if (storedOtp != null && storedOtp.equals(inputOtp)) {
            redisTemplate.delete(key); // delete OTP after use
            return true;
        }
        return false;
    }
}

