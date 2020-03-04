package com.phoenixoft.teambalanceapp.user.entity;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(name = "tbl_user")
@Data
@ToString(exclude = {"roles", "games", "groups"})
@EqualsAndHashCode(exclude = {"roles", "games", "groups"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_gen")
    @SequenceGenerator(name = "user_gen", sequenceName = "user_seq", allocationSize = 1)
    private Long id;

    private String password;

    private String email;

    private String firstName;

    private String lastName;

    private String phone;

    private BigDecimal rating;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(mappedBy = "members", fetch = FetchType.LAZY)
    private List<Group> groups = new ArrayList<>();

    @ManyToMany(mappedBy = "players", fetch = FetchType.LAZY)
    private List<Game> games = new ArrayList<>();

    public Optional<Group> removeGroup(long groupId) {
        ListIterator<Group> groupListIterator = groups.listIterator();
        while (groupListIterator.hasNext()) {
            Group group = groupListIterator.next();
            if (group.getId().equals(groupId)) {
                groupListIterator.remove();
                return Optional.of(group);
            }
        }
        return Optional.empty();
    }

    public void removeGroup(Group group) {
        this.groups.remove(group);
        group.getMembers().remove(this);
    }

    public void removeRoles(Set<Role> roles) {
        roles.forEach(this::removeRole);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
        role.getUsers().remove(this);
    }

    public void addRoles(Set<Role> newRoles) {
        this.getRoles().addAll(newRoles);
        newRoles.forEach(role -> role.getUsers().add(this));
    }
}
