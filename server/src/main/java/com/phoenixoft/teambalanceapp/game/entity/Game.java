package com.phoenixoft.teambalanceapp.game.entity;

import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_game")
@Data
@ToString(exclude = {"players", "group"})
@EqualsAndHashCode(exclude = {"players", "group"})
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_gen")
    @SequenceGenerator(name = "game_gen", sequenceName = "game_seq", allocationSize = 1)
    private Long id;

    private String name;

    @Column(name = "start_timestamp")
    private LocalDateTime startDateTime;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "tbl_game_players",
            joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id"))
    private List<User> players = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    public boolean removePlayer(Long playerId) {
        return players.removeIf(player -> player.getId().equals(playerId));
    }
}
