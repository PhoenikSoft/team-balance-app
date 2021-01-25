package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.game.entity.GameBalancing;
import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.model.TeamBalancingConfig;
import com.phoenixoft.teambalanceapp.game.repository.GameBalancingRepository;
import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.util.Comparator.comparingInt;

@RequiredArgsConstructor
public class RandomizerTeamBalancer implements TeamBalancer {

    private final TeamBalancer teamBalancer;
    private final GameBalancingRepository gameBalancingRepository;
    private final Random random;

    @Override
    public List<Team> dividePlayersIntoBalancedTeams(TeamBalancingConfig teamBalancingConfig) {
        List<Team> teams = teamBalancer.dividePlayersIntoBalancedTeams(teamBalancingConfig);
        Long gameId = teamBalancingConfig.getGameId();
        GameBalancing gameBalancing = gameBalancingRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game balancing not found: " + gameId));

        List<Integer> usedBalancing = gameBalancing.getUsedBalancing();
        int totalPlayers = getTotalPlayers(teams);
        int ranIndexLimit = totalPlayers - teams.size();
        List<Integer> indexList = IntStream.range(0, ranIndexLimit)
                .filter(index -> !usedBalancing.contains(index))
                .boxed()
                .collect(Collectors.toList());
        int nextRanIndex;
        if (indexList.isEmpty()) {
            nextRanIndex = random.nextInt(ranIndexLimit);
        } else {
            nextRanIndex = indexList.get(random.nextInt(indexList.size()));
            usedBalancing.add(nextRanIndex);
        }

        List<Team> swappedTeams = swapPlayersForIndex(teams, nextRanIndex);

        gameBalancing.setUsedBalancing(usedBalancing);
        gameBalancingRepository.save(gameBalancing);

        return swappedTeams;
    }

    private static List<Team> swapPlayersForIndex(List<Team> teams, int indexForSwapping) {
        teams.sort(comparingInt((Team team) -> team.getPlayers().size()).reversed());

        int totalPlayers = getTotalPlayers(teams);
        Player[] playersForSwapping = new Player[teams.size()];
        for (int i = indexForSwapping, j = 0; j < teams.size(); i = (i + 1) % totalPlayers, j++) {
            int teamNumber = i % teams.size();
            int playerNumber = i / teams.size();
            playersForSwapping[teamNumber] = teams.get(teamNumber).getPlayers().get(playerNumber);
        }

        for (int i = 0; i < playersForSwapping.length; i++) {
            Team team = teams.get(i);
            team.replacePlayer(playersForSwapping[i], playersForSwapping[(i + 1) % playersForSwapping.length]);
        }

        return teams;
    }

    private static int getTotalPlayers(List<Team> teams) {
        return teams.stream().mapToInt(team -> team.getPlayers().size()).sum();
    }
}
