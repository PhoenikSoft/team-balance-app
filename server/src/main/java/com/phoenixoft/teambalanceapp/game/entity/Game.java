package com.phoenixoft.teambalanceapp.game.entity;

import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Type;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_game")
@Data
@ToString(exclude = {"balancedTeams", "players", "group"})
@EqualsAndHashCode(exclude = {"balancedTeams", "players", "group"})
public class Game implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_gen")
    @SequenceGenerator(name = "game_gen", sequenceName = "game_seq", allocationSize = 1)
    private Long id;

    private String name;

    @Column(name = "start_timestamp")
    private LocalDateTime startDateTime;

    @Type(type = "com.vladmihalcea.hibernate.type.json.JsonBinaryType")
    @Column(name = "balanced_teams", columnDefinition = "jsonb")
    @Basic(fetch = FetchType.LAZY)
    private BalancedTeams balancedTeams;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "tbl_game_players",
            joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id"))
    private List<User> players = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @Column(name = "vote_status")
    @Enumerated(value = EnumType.STRING)
    private VoteStatus voteStatus;

    public boolean removePlayer(Long playerId) {
        boolean removed = players.removeIf(player -> player.getId().equals(playerId));
        if (removed) {
            balancedTeams = null;
        }
        return removed;
    }

    public boolean hasPlayer(Long playerId) {
        return this.players.stream().anyMatch(player -> player.getId().equals(playerId));
    }
}
