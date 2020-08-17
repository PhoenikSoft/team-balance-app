package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.LongListArgumentConverter;
import com.phoenixoft.teambalanceapp.common.TestData;
import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class BestIntermediateAverageRatingTeamBalancerTest implements TestData {

    private final BestIntermediateAverageRatingTeamBalancer teamBalancer = new BestIntermediateAverageRatingTeamBalancer(new Random(1));

    @DisplayName("Should divide input list of players into balanced teams")
    @ParameterizedTest
    @CsvSource({
            "90:75:100:85:50:45:65:65:65:20:30:25:10,100:65:45:30:10,90:65:65:20,85:75:50:25"
    })
    void testDividePlayersIntoBalancedTeams(@ConvertWith(LongListArgumentConverter.class) List<Long> input,
                                            @ConvertWith(LongListArgumentConverter.class) List<Long> expectedFirst,
                                            @ConvertWith(LongListArgumentConverter.class) List<Long> expectedSecond,
                                            @ConvertWith(LongListArgumentConverter.class) List<Long> expectedThird) {
        List<Player> users = input.stream().map(id -> mockPlayer(id, new BigDecimal(id))).collect(Collectors.toList());

        List<Team> balancedTeams = teamBalancer.dividePlayersIntoBalancedTeams(users, 3);

        List<Long> firstIds = balancedTeams.get(0).getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        assertThat(firstIds).containsExactlyInAnyOrderElementsOf(expectedFirst);
        List<Long> secondIds = balancedTeams.get(1).getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        assertThat(secondIds).containsExactlyInAnyOrderElementsOf(expectedSecond);
        List<Long> thirdIds = balancedTeams.get(2).getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        assertThat(thirdIds).containsExactlyInAnyOrderElementsOf(expectedThird);
    }

    @DisplayName("Should throw exception if too small input")
    @ParameterizedTest
    @ValueSource(strings = {"", "1", "1:2"})
    void testDividePlayersIntoBalancedTeams_tooSmallInputList(@ConvertWith(LongListArgumentConverter.class) List<Long> input) {
        List<Player> players = input.stream().map(id -> mockPlayer(id, new BigDecimal(id))).collect(Collectors.toList());

        assertThrows(IllegalArgumentException.class, () -> teamBalancer.dividePlayersIntoBalancedTeams(players, 3));
    }
}
