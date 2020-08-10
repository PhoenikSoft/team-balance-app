package com.phoenixoft.teambalanceapp.game.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team implements Serializable {

    private List<Player> players;

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void replacePlayer(Player oldPlayer, Player newPlayer) {
        int replaceIndex = players.indexOf(oldPlayer);
        players.set(replaceIndex, newPlayer);
    }

    @JsonIgnore
    public boolean isEmpty() {
        return players.isEmpty();
    }

    @JsonIgnore
    public BigDecimal getAverageRating() {
        return players.stream()
                .map(Player::getRating)
                .reduce(BigDecimal::add)
                .map(sum -> sum.divide(new BigDecimal(players.size()), 2, RoundingMode.HALF_UP))
                .orElse(BigDecimal.ZERO);
    }

    public static Team of() {
        return new Team(new ArrayList<>());
    }

    public static Team of(List<Player> players) {
        return new Team(new ArrayList<>(players));
    }
}
