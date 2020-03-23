package com.phoenixoft.teambalanceapp.security.dto;

import com.phoenixoft.teambalanceapp.controller.dto.RoleResponseDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthUserDetails {

    private Long id;
    private String username;
    private List<RoleResponseDto> roles;

    public static AuthUserDetails of(User user) {
        AuthUserDetails userDetails = new AuthUserDetails();
        userDetails.id = user.getId();
        userDetails.username = user.getEmail();
        userDetails.roles = user.getRoles().stream().map(RoleResponseDto::of).collect(Collectors.toList());
        return userDetails;
    }
}
