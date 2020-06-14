package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Data
public class AddGameVotesRequestDto {

    @Valid
    List<UserGameVoteRequestDto> votes = new ArrayList<>();
}
