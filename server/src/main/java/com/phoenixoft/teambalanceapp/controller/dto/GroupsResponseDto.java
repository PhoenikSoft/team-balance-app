package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.util.List;

@Data
public class GroupsResponseDto {
    private List<GroupResponseDto> groups;
}
