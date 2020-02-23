package com.phoenixoft.teambalanceapp.game.entity;

import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Value;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Value
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Team {

    List<User> players;

    public void addPlayer(User player) {
        players.add(player);
    }

    public boolean isEmpty() {
        return players.isEmpty();
    }

    public BigDecimal getAverageRating() {
        return players.stream()
                .map(User::getRating)
                .reduce(BigDecimal::add)
                .map(sum -> sum.divide(new BigDecimal(players.size()), 2, RoundingMode.HALF_UP))
                .orElse(BigDecimal.ZERO);
    }

    public static Team of() {
        return new Team(new ArrayList<>());
    }

    public static Team of(List<User> players) {
        return new Team(new ArrayList<>(players));
    }
}
