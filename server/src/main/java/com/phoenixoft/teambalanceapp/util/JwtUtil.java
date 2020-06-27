package com.phoenixoft.teambalanceapp.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.phoenixoft.teambalanceapp.common.exception.CustomExpiredJwtException;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.util.model.JwtRoles;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    private final String SECRET_KEY;
    private static final int JWT_EXPIRATION_DURATION_IN_MILLIS = 60 * 60 * 1000;

    private final ObjectMapper objectMapper;

    public JwtUtil(@Value("${jwt_secret}") String secret_key, ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        SECRET_KEY = secret_key;
    }

    public String extractUsername(String token) {
        if (isTokenExpired(token)) {
            throw new CustomExpiredJwtException("JWT token is expired!");
        }
        return extractClaim(token, Claims::getSubject);
    }

    @SneakyThrows
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", objectMapper.writeValueAsString(JwtRoles.of(user.getRoles())));
        return createToken(claims, user.getEmail());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        return !isTokenExpired(token) && extractUsername(token).equals(userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_DURATION_IN_MILLIS)) // TODO: Extract to the config file
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
}
