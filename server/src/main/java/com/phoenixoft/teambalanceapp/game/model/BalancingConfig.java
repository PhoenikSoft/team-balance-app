package com.phoenixoft.teambalanceapp.game.model;

import com.phoenixoft.teambalanceapp.game.entity.Player;
import lombok.Builder;
import lombok.Value;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Value
@Builder
public class BalancingConfig {

    long userId;

    long gameId;

    int teamsCount;

    List<Player> bots;

    public static class BalancingConfigBuilder {

        public BalancingConfigBuilder bots(List<Player> bots) {
            this.bots = Optional.ofNullable(bots)
                    .map(botsList -> bots.stream().map(this::markAsBot).collect(Collectors.toList()))
                    .orElse(Collections.EMPTY_LIST);
            return this;
        }

        private Player markAsBot(Player player) {
            player.setBot(true);
            return player;
        }
    }
}
