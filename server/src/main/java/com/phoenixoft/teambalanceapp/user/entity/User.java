package com.phoenixoft.teambalanceapp.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.util.RoleGenerator;
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
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(value = {"password", "roles", "groups", "games"}, ignoreUnknown = true)
@Entity
@Table(name = "tbl_user")
@Data
@ToString(exclude = {"password", "roles", "games", "groups"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_gen")
    @SequenceGenerator(name = "user_gen", sequenceName = "user_seq", allocationSize = 1)
    @EqualsAndHashCode.Include
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

    public void removeRoles(Set<Role> roles) {
        roles.forEach(this::removeRole);
    }

    public void removeRole(Role role) {
        this.roles.removeIf(userRole -> userRole.getName().equals(role.getName()));
        role.getUsers().remove(this);
    }

    public void addRoles(Set<Role> newRoles) {
        this.getRoles().addAll(newRoles);
        newRoles.forEach(role -> role.getUsers().add(this));
    }

    public boolean isAdminInGroup(long groupId) {
        return this.roles.stream()
                .anyMatch(role -> role.getName().equals(RoleGenerator.createAdminRoleTitle(groupId)));
    }
}
