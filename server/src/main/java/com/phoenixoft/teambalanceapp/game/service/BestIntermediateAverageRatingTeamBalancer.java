package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.user.entity.User;
import org.postgresql.shaded.com.ongres.scram.common.util.Preconditions;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.phoenixoft.teambalanceapp.util.AppUtils.generateAllCombinations;

@Primary
@Component
public class BestIntermediateAverageRatingTeamBalancer implements TeamBalancer {

    private static final int TEAM_COUNT = 3;

    @Override
    public List<Team> dividePlayersIntoBalancedTeams(List<User> players) {
        Preconditions.checkArgument(players.size() > 2, "players");

        if (players.size() == 3) {
            return Arrays.asList(Team.of(Collections.singletonList(players.get(0))),
                    Team.of(Collections.singletonList(players.get(1))),
                    Team.of(Collections.singletonList(players.get(2))));
        }

        List<User> sortedUsers = players.stream()
                .sorted(Comparator.comparing(User::getRating).reversed())
                .collect(Collectors.toList());
        List<Team> teams = IntStream.range(0, TEAM_COUNT).mapToObj(index -> Team.of()).collect(Collectors.toList());
        Iterator<User> iterator = sortedUsers.iterator();
        while (iterator.hasNext()) {
            List<User> nextBatch = nextBatch(iterator);
            addPlayersToTeams(teams, nextBatch);
        }
        return teams;
    }

    private static void addPlayersToTeams(List<Team> teams, List<User> players) {
        if (teams.get(0).isEmpty()) {
            for (int i = 0; i < players.size(); i++) {
                teams.get(i).addPlayer(players.get(i));
            }
            return;
        }

        List<Optional<User>> orderToInsert = defineOrderToInsertPlayersIntoTeams(teams, players);
        for (int i = 0; i < orderToInsert.size(); i++) {
            orderToInsert.get(i).ifPresent(teams.get(i)::addPlayer);
        }
    }

    private static List<Optional<User>> defineOrderToInsertPlayersIntoTeams(List<Team> teams, List<User> players) {
        List<Optional<User>> playersOrEmpty = IntStream.range(0, teams.size())
                .mapToObj(i -> i < players.size() ? Optional.of(players.get(i)) : Optional.<User>empty())
                .collect(Collectors.toList());
        List<List<Optional<User>>> allPlayersCombinations = generateAllCombinations(playersOrEmpty);

        TreeMap<BigDecimal, List<Optional<User>>> sortedCombinations = allPlayersCombinations.stream()
                .collect(Collectors.toMap(
                        combination -> teamsRatingDifferenceForCombination(combination, teams),
                        Function.identity(),
                        (list1, list2) -> list1,
                        TreeMap::new
                ));
        return sortedCombinations.firstEntry().getValue();
    }

    private static BigDecimal teamsRatingDifferenceForCombination(List<Optional<User>> combination, List<Team> teams) {
        ArrayList<BigDecimal> newAverages = new ArrayList<>(combination.size());
        for (int i = 0; i < combination.size(); i++) {
            Team team = teams.get(i);
            BigDecimal averageRating = team.getAverageRating();
            BigDecimal newAverage = combination.get(i).map(user ->
                    newAverageIfAddPlayer(averageRating, user.getRating(), team.getPlayers().size()))
                    .orElse(averageRating);
            newAverages.add(newAverage);
        }
        return teamsRatingDifference(newAverages);
    }

    private static BigDecimal teamsRatingDifference(List<BigDecimal> averageRatings) {
        Preconditions.checkArgument(averageRatings.size() > 1, "averageRatings");
        Collections.sort(averageRatings);
        return averageRatings.get(averageRatings.size() - 1).subtract(averageRatings.get(0));
    }

    private static BigDecimal newAverageIfAddPlayer(BigDecimal oldAverage, BigDecimal newPlayerRating, int oldSize) {
        return oldAverage.multiply(new BigDecimal(oldSize)).add(newPlayerRating)
                .divide(new BigDecimal(oldSize + 1), 2, RoundingMode.HALF_EVEN);
    }

    private static List<User> nextBatch(Iterator<User> iterator) {
        ArrayList<User> batch = new ArrayList<>(TEAM_COUNT);
        for (int i = 0; i < TEAM_COUNT; i++) {
            if (!iterator.hasNext()) {
                return batch;
            }
            batch.add(iterator.next());
        }
        return batch;
    }
}
