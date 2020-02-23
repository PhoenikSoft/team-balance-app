package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.util.Converter;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class TeamResponseDto {
    private List<UserResponseDto> players;

    public static TeamResponseDto of(Team team) {
        TeamResponseDto dto = new TeamResponseDto();
        dto.players = team.getPlayers().stream().map(Converter::convertUser).collect(Collectors.toList());
        return dto;
    }
}
