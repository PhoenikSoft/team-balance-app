package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GameResponseDto {
    private Long id;
    private String name;
    private LocalDateTime startDateTime;
    private VoteStatus voteStatus;
    private LocalDateTime startVotingTimestamp;
    private LocalDateTime endVotingTimestamp;
    private List<UserResponseDto> players;
    private BalancedTeamsResponseDto balancedTeams;
}
