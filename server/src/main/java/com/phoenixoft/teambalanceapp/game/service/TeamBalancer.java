package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.user.entity.User;

import java.util.List;

public interface TeamBalancer {

    List<Team> dividePlayersIntoBalancedTeams(List<User> players);
}
