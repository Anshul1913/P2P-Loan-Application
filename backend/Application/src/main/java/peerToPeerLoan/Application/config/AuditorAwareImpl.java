package peerToPeerLoan.Application.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class AuditorAwareImpl implements AuditorAware<String> {

    @Value("${project.dev}")
    private String projectDev;

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null){
            return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication().getName());
        }
        return Optional.of("SYSTEM:"+projectDev);
    }
}

