package com.phoenixoft.teambalanceapp.util;

import com.phoenixoft.teambalanceapp.controller.dto.AddedGroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.BalancedTeamsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.PlayerResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.BalancedTeams;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DtoConverter {

    public static UserResponseDto convertUser(User entity) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(entity.getId());
        dto.setEmail(entity.getEmail());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setRating(entity.getRating());
        dto.setPhone(entity.getPhone());
        return dto;
    }

    public static PlayerResponseDto convertPlayer(User entity) {
        PlayerResponseDto dto = new PlayerResponseDto();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        return dto;
    }

    public static GroupsResponseDto convertGroups(List<Group> groups) {
        GroupsResponseDto dto = new GroupsResponseDto();
        dto.setGroups(groups.stream().map(DtoConverter::convertGroup).collect(Collectors.toList()));
        return dto;
    }

    public static GroupResponseDto convertGroup(Group entity) {
        GroupResponseDto dto = new GroupResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setRef(entity.getRef());
        dto.setMembers(entity.getMembers().stream().map(DtoConverter::convertUser).collect(Collectors.toList()));
        dto.setGames(entity.getGames().stream().map(DtoConverter::convertGame).collect(Collectors.toList()));
        return dto;
    }

    public static AddedGroupResponseDto convertAddGroup(Group group) {
        AddedGroupResponseDto dto = new AddedGroupResponseDto();
        dto.setGroup(convertGroup(group));
        return dto;
    }

    public static GameResponseDto convertGame(Game entity) {
        GameResponseDto dto = new GameResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStartDateTime(entity.getStartDateTime());
        dto.setPlayers(entity.getPlayers().stream().map(DtoConverter::convertUser).collect(Collectors.toList()));
        Optional.ofNullable(entity.getBalancedTeams())
                .map(BalancedTeams::getTeams)
                .map(BalancedTeamsResponseDto::of)
                .ifPresent(dto::setBalancedTeams);
        return dto;
    }
}
