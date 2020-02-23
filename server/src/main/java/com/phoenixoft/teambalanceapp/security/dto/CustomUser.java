package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * Custom Spring Security UserDetails class to provide additional information about logged in user.
 * For UserDetails username email is used.
 */
@Getter
@Setter
public class CustomUser extends User {

    private Long id;

    public CustomUser(Long userId, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        super(email, password, authorities);
        this.id = userId;
    }
}
