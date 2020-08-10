package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import lombok.Data;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Data
public class BalancingBots {

    @Valid
    private List<Player> bots = new ArrayList<>();
}
