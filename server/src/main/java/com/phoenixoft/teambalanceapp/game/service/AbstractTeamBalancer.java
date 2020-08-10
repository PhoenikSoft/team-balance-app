package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Random;

@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public abstract class AbstractTeamBalancer implements TeamBalancer {

    Random random;

    @Override
    public List<Team> dividePlayersIntoBalancedTeamsWithSomeRandomness(List<Player> players, int teamsCount) {
        List<Team> teams = dividePlayersIntoBalancedTeams(players, teamsCount);
        Player[] randomUsers = pickRandomUserFromEachTeam(teams);
        for (int i = 0; i < randomUsers.length; i++) {
            Team team = teams.get(i);
            team.replacePlayer(randomUsers[i], randomUsers[(i + 1) % randomUsers.length]);
        }
        return teams;
    }

    private Player[] pickRandomUserFromEachTeam(List<Team> teams) {
        Player[] randomUsers = new Player[teams.size()];
        for (int i = 0; i < teams.size(); i++) {
            List<Player> players = teams.get(i).getPlayers();
            randomUsers[i] = players.get(random.nextInt(players.size()));
        }
        return randomUsers;
    }
}
