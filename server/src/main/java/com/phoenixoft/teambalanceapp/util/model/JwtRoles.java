package com.phoenixoft.teambalanceapp.util.model;

import com.phoenixoft.teambalanceapp.controller.dto.RoleResponseDto;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtRoles {

    private List<RoleResponseDto> roles;

    public static JwtRoles of(Set<Role> roles) {
        JwtRoles jwtRoles = new JwtRoles();
        jwtRoles.roles = roles.stream().map(RoleResponseDto::of).collect(Collectors.toList());
        return jwtRoles;
    }
}
