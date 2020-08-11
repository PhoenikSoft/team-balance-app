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

class AllVariantTeamBalancerTest implements TestData {

    private final AllVariantsTeamBalancer teamBalancer = new AllVariantsTeamBalancer(new Random(1));

    @DisplayName("Should divide input list of players into balanced teams")
    @ParameterizedTest
    @CsvSource({
            "1:3,1,3",
            "1:2:3,2,1:3",
            "10:33:45:69:71:90,10:69:71,33:45:90"
    })
    void testDividePlayersIntoBalancedTeams(@ConvertWith(LongListArgumentConverter.class) List<Long> input,
                                            @ConvertWith(LongListArgumentConverter.class) List<Long> expectedLeft,
                                            @ConvertWith(LongListArgumentConverter.class) List<Long> expectedRight) {
        List<Player> users = input.stream().map(id -> mockPlayer(id, new BigDecimal(id))).collect(Collectors.toList());

        List<Team> balancedTeams = teamBalancer.dividePlayersIntoBalancedTeams(users, 2);

        List<Long> leftIds = balancedTeams.get(0).getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        assertThat(leftIds).containsExactlyInAnyOrderElementsOf(expectedLeft);
        List<Long> rightIds = balancedTeams.get(1).getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        assertThat(rightIds).containsExactlyInAnyOrderElementsOf(expectedRight);
    }

    @DisplayName("Should throw exception if too small input")
    @ParameterizedTest
    @ValueSource(strings = {"", "1"})
    void testDividePlayersIntoBalancedTeams_tooSmallInputList(@ConvertWith(LongListArgumentConverter.class) List<Long> input) {
        List<Player> users = input.stream().map(id -> mockPlayer(id, new BigDecimal(id))).collect(Collectors.toList());

        assertThrows(IllegalArgumentException.class, () -> teamBalancer.dividePlayersIntoBalancedTeams(users, 2));
    }
}
