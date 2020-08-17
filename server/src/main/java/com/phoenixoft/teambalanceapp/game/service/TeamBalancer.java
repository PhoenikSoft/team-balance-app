package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.user.entity.User;

import java.util.List;

public interface TeamBalancer {

    List<Team> dividePlayersIntoBalancedTeams(List<Player> players, int teamsCount);

    List<Team> dividePlayersIntoBalancedTeamsWithSomeRandomness(List<Player> players, int teamsCount);
}
