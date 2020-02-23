package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class GroupResponseDto {
    private Long id;
    private String name;
    private List<UserResponseDto> members;
    private List<GameResponseDto> games;
}
