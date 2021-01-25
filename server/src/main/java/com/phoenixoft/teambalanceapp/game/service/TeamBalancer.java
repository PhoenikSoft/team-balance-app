package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.model.TeamBalancingConfig;

import java.util.List;

public interface TeamBalancer {

    List<Team> dividePlayersIntoBalancedTeams(TeamBalancingConfig teamBalancingConfig);
}
