package com.phoenixoft.teambalanceapp.game.model;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class TeamBalancingConfig {

    Long gameId;
    List<Player> players;
    int teamsCount;
}
