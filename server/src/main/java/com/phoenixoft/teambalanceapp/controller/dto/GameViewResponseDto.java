package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Value;

import java.util.List;

@Value(staticConstructor = "of")
public class GameViewResponseDto {
    GameResponseDto game;
    List<GameUserVoteResponseDto> userVotes;
}
