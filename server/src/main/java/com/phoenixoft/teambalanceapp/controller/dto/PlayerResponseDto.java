package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PlayerResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private BigDecimal rating;
}
