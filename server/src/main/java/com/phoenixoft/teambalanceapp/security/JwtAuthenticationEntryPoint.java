package com.phoenixoft.teambalanceapp.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.phoenixoft.teambalanceapp.security.JwtRequestFilter.EXPIRED_TOKEN;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        String expiredTokenHeader = response.getHeader(EXPIRED_TOKEN);
        if (expiredTokenHeader != null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token was expired");
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
        }
    }
}
