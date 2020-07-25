package com.phoenixoft.teambalanceapp.security;

import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@AllArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final static String USER_ATTR = "currentCustomUser";
    public static final String EXPIRED_TOKEN = "Expired token";

    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (ExpiredJwtException ex) {
                response.setHeader(EXPIRED_TOKEN, ex.getMessage());
            }
        }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            CustomUser customUser = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, customUser)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        customUser, null, customUser.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                request.setAttribute(USER_ATTR, customUser);
            }
        }
        chain.doFilter(request, response);
    }

}
