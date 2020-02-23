package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserResponseDto {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private BigDecimal rating;
}
