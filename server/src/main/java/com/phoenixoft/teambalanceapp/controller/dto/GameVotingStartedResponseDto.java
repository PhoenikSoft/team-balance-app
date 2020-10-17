package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Value;

import java.time.LocalDateTime;

@Value(staticConstructor = "of")
public class GameVotingStartedResponseDto {
    LocalDateTime endVotingTimestamp;
}
