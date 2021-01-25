package com.phoenixoft.teambalanceapp.game.entity;

import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "tbl_game")
@Data
@ToString(exclude = {"players", "group"})
@EqualsAndHashCode(exclude = {"players", "group"})
public class Game implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "game_gen")
    @SequenceGenerator(name = "game_gen", sequenceName = "game_seq", allocationSize = 1)
    private Long id;

    private String name;

    @Column(name = "start_timestamp")
    private LocalDateTime startDateTime;

    @Type(type = "com.vladmihalcea.hibernate.type.json.JsonBinaryType")
    @OneToOne(fetch = FetchType.LAZY,
            orphanRemoval = true,
            mappedBy = "game",
            cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private GameBalancing gameBalancing;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "tbl_game_players",
            joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id"))
    private List<User> players = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @Column
    @CreationTimestamp
    private LocalDateTime created;

    // ------------ Voting fields -------------------
    @OneToMany(mappedBy = "game", orphanRemoval = true)
    private List<UserVote> votes = new ArrayList<>();

    @Column(name = "vote_status")
    @Enumerated(value = EnumType.STRING)
    private VoteStatus voteStatus;

    @Column
    private LocalDateTime startVotingTimestamp;

    @Column
    private LocalDateTime endVotingTimestamp;

    public void setNewBalancedTeams(List<Team> teams) {
        GameBalancing gameBalancingObj = Optional.ofNullable(gameBalancing).orElse(new GameBalancing());
        gameBalancingObj.setBalancedTeams(new BalancedTeams(teams));
        gameBalancing = gameBalancingObj;
        gameBalancing.setGame(this);
    }

    public boolean removePlayer(Long playerId) {
        boolean removed = players.removeIf(player -> player.getId().equals(playerId));
        if (removed && gameBalancing != null) {
            gameBalancing.resetBalancing();
        }
        return removed;
    }

    public boolean hasPlayer(Long playerId) {
        return this.players.stream().anyMatch(player -> player.getId().equals(playerId));
    }
}
