package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.user.entity.Role;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleResponseDto {

    private Long id;
    private String name;

    public static RoleResponseDto of(Role role) {
        RoleResponseDto dto = new RoleResponseDto();
        dto.id = role.getId();
        dto.name = role.getName();
        return dto;
    }
}
