package com.phoenixoft.teambalanceapp.group.entity;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "tbl_group")
@Data
@ToString(exclude = {"members", "games"})
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "group_gen")
    @SequenceGenerator(name = "group_gen", sequenceName = "group_seq", allocationSize = 1)
    private Long id;

    private String name;

    private String ref;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "tbl_group_users",
            joinColumns = @JoinColumn(name = "group_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<User> members = new ArrayList<>();

    @OneToMany(orphanRemoval = true, mappedBy = "group")
    private List<Game> games = new ArrayList<>();

    public boolean removeMember(User member) {
        member.getGroups().remove(this);
        return members.removeIf(groupMember -> groupMember.getId().equals(member.getId()));
    }

    public Optional<User> findMember(Long memberId) {
        return members.stream().filter(member -> member.getId().equals(memberId)).findFirst();
    }

    public Optional<Game> findGame(Long gameId) {
        return games.stream().filter(game -> game.getId().equals(gameId)).findFirst();
    }
}
