package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private BigDecimal rating;
    private List<RoleResponseDto> roles;
}
