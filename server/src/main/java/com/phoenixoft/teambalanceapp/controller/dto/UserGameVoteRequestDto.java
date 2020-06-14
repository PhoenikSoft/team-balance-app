package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class UserGameVoteRequestDto {

    @NotNull(message = "{userVote.null.forUserId}")
    private Long forUserId;
    @NotNull(message = "{userVote.null.vote}")
    @Min(-5)
    @Max(5)
    private Integer vote;
}
