package com.phoenixoft.teambalanceapp.game.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.phoenixoft.teambalanceapp.user.entity.User;
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

    private List<User> players;

    public void addPlayer(User player) {
        players.add(player);
    }

    @JsonIgnore
    public boolean isEmpty() {
        return players.isEmpty();
    }

    @JsonIgnore
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
