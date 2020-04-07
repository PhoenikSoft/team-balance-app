package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GameResponseDto {
    private Long id;
    private String name;
    private LocalDateTime startDateTime;
    private List<UserResponseDto> players;
    private BalancedTeamsResponseDto balancedTeams;
}
