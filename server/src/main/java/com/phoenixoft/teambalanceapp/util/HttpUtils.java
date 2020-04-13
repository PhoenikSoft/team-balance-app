package com.phoenixoft.teambalanceapp.util;

import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class HttpUtils {

    public static final String RESPONSE_NEW_JWT_HEADER = "APP_NEW_JWT";

    private final JwtUtil jwtUtil;

    public ResponseEntity.BodyBuilder addJwtToResponse(ResponseEntity.BodyBuilder responseBuilder, User user) {
        String newJwt = this.jwtUtil.generateToken(user);
        return responseBuilder.header(RESPONSE_NEW_JWT_HEADER, newJwt);
    }
}
