package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.util.Tuple2;
import org.postgresql.shaded.com.ongres.scram.common.util.Preconditions;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static com.phoenixoft.teambalanceapp.util.AppUtils.addElem;
import static com.phoenixoft.teambalanceapp.util.AppUtils.removeElem;

@Qualifier("allVariants")
@Component
public class AllVariantsTeamBalancer extends AbstractTeamBalancer {

    public AllVariantsTeamBalancer(Random random) {
        super(random);
    }

    @Override
    @Deprecated
    public List<Team> dividePlayersIntoBalancedTeams(List<Player> players, int teamsCount) {
        Preconditions.checkArgument(players.size() >= 2, "players");

        if (players.size() == teamsCount) {
            return players.stream().map(Collections::singletonList).map(Team::of).collect(Collectors.toList());
        }

        List<Tuple2<Team, Team>> combinations = getAllCombinations(new ArrayList<>(), players);
        List<Tuple2<Team, Team>> sortedTeamPairs = combinations.stream()
                .sorted(Comparator.comparing(this::getRatingDifferenceOfTeams))
                .collect(Collectors.toList());
        return Arrays.asList(sortedTeamPairs.get(0).getLeft(), sortedTeamPairs.get(0).getRight());
    }

    private BigDecimal getRatingDifferenceOfTeams(Tuple2<Team, Team> teams) {
        return teams.getLeft().getAverageRating().subtract(teams.getRight().getAverageRating()).abs();
    }

    private static List<Tuple2<Team, Team>> getAllCombinations(List<Player> leftTeam, List<Player> rightTeam) {
        if (leftTeam.size() >= rightTeam.size() - 1) {
            return Collections.singletonList(Tuple2.of(Team.of(leftTeam), Team.of(rightTeam)));
        }

        return rightTeam.stream()
                .flatMap(rightPlayer -> getAllCombinations(addElem(leftTeam, rightPlayer), removeElem(rightTeam, rightPlayer)).stream())
                .collect(Collectors.toList());
    }
}
