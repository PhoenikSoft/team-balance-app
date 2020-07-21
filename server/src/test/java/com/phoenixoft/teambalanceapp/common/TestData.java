package com.phoenixoft.teambalanceapp.common;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface TestData {

    default User mockUser(long id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    default User mockUser(long id, BigDecimal rating) {
        User user = mockUser(id);
        user.setRating(rating);
        return user;
    }

    default User mockUserWithGroup(long id, Group group) {
        User user = new User();
        user.setId(id);
        user.getGroups().add(group);
        return user;
    }

    default User mockUserWithGame(long id, Game game) {
        User user = new User();
        user.setId(id);
        user.getGames().add(game);
        return user;
    }

    default Group mockGroup(long id) {
        Group obj = new Group();
        obj.setId(id);
        obj.setName("test group");
        return obj;
    }

    default Game mockGame(long id) {
        Game obj = new Game();
        obj.setId(id);
        obj.setName("test game");
        obj.setStartDateTime(LocalDateTime.of(2019, 12, 12, 12, 0));
        return obj;
    }
}
