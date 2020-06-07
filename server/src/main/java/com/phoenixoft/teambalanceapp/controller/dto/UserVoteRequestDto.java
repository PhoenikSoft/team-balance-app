package com.phoenixoft.teambalanceapp.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UserVoteRequestDto {

    @JsonIgnore
    private Long forUserId;
    @JsonIgnore
    private Long voterId;
    @NotNull(message = "{userVote.null.gameId}")
    private Long gameId;
    @NotNull(message = "{userVote.null.vote}")
    private VoteOption vote;
}
