package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BalancedTeamsResponseDto {

    private List<TeamResponseDto> teams;

    public static BalancedTeamsResponseDto of(List<Team> teams) {
        BalancedTeamsResponseDto dto = new BalancedTeamsResponseDto();
        dto.teams = teams.stream().map(TeamResponseDto::of).collect(Collectors.toList());
        return dto;
    }
}
