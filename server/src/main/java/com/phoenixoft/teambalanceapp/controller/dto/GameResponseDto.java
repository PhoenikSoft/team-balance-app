package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameResponseDto {
    private Long id;
    private String name;
    private LocalDateTime startDateTime;
}
