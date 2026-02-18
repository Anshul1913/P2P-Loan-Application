package peerToPeerLoan.Application.utils.security;


import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);
    @Autowired
    private JWTHelper jwtHelper;


    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain ) throws ServletException, IOException {
        String requestHeader = request.getHeader("Authorization");
        logger.debug(" Header :  {}", requestHeader);
        logger.debug("Request URL: {}", request.getPathInfo());
        String username = null;
        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            //looking good
            username = jwtHelper.getUsernameFromToken(requestHeader.substring(7));
            logger.debug("Extracted username from token: {}", username);
        } else if (requestHeader != null){
            logger.error("Unsupported Header Value !! ");
            throw new UnsupportedJwtException("Unsupported Authorization Header Value");
        }else{
            logger.error("Invalid Header Value !! ");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (this.jwtHelper.validateToken(requestHeader.substring(7), userDetails)) {

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } else {
                logger.error("Validation fails !!");
                throw new MalformedJwtException("Validation failed for given jwt token");
            }
        }

        filterChain.doFilter(request, response);

    }
}

