package peerToPeerLoan.Application.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import peerToPeerLoan.Application.serviceImpl.UserDetailService;
import peerToPeerLoan.Application.utils.security.JWTAuthenticationEntryPoint;
import peerToPeerLoan.Application.utils.security.JWTAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

    @Autowired
    private JWTAuthenticationEntryPoint point;
    @Autowired
    private JWTAuthenticationFilter filter;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity http)throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfig.corsFilter()))
                .authorizeHttpRequests(auth ->{
                    auth
                            .requestMatchers("/api/auth/**").permitAll()
//                            .requestMatchers("/api/v1/applicant/**").hasAnyAuthority("APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/org-admin/**").hasAnyAuthority("ORG_ADMIN","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/contact/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/address/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/drop-list/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/education/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/designation/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/career-history/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/achievement/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/skills/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/document-proof/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/job-locations/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/job-posts/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/job-post-questions/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/incident-report/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/organisation/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/dashboard/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/reviews/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/faq/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/company-profile-basic/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/basic-details-applicant/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/user-subscription/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/subscription-plan/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/user-organisation-following/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/network/**").hasAnyAuthority("ORG_ADMIN","APPLICANT","SUPER_ADMIN")
//                            .requestMatchers("/api/v1/su/**").hasAnyAuthority("SUPER_ADMIN")
                            .anyRequest()
                            .authenticated();
                })
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
