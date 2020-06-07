package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class GameUserVoteResponseDto {
    Long id;
    Long forUserId;
    int vote;
}
