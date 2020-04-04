package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class AddPlayersRequestDto {

    List<Long> playersIds = new ArrayList<>();
}
