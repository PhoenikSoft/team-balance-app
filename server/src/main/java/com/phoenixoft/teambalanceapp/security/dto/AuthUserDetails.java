package com.phoenixoft.teambalanceapp.security.dto;

import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthUserDetails {

    private Long id;
    private String username;

    public static AuthUserDetails of(User user) {
        AuthUserDetails userDetails = new AuthUserDetails();
        userDetails.id = user.getId();
        userDetails.username = user.getEmail();
        return userDetails;
    }
}
