package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class TeamResponseDto {
    private List<PlayerResponseDto> players;

    public static TeamResponseDto of(Team team) {
        TeamResponseDto dto = new TeamResponseDto();
        dto.players = team.getPlayers().stream().map(DtoConverter::convertPlayer).collect(Collectors.toList());
        return dto;
    }
}
