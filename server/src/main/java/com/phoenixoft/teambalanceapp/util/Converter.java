package com.phoenixoft.teambalanceapp.util;

import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Converter {

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

    public static GroupsResponseDto convertGroups(List<Group> groups) {
        GroupsResponseDto dto = new GroupsResponseDto();
        dto.setGroups(groups.stream().map(Converter::convertGroup).collect(Collectors.toList()));
        return dto;
    }

    public static GroupResponseDto convertGroup(Group entity) {
        GroupResponseDto dto = new GroupResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setMembers(entity.getMembers().stream().map(Converter::convertUser).collect(Collectors.toList()));
        dto.setGames(entity.getGames().stream().map(Converter::convertGame).collect(Collectors.toList()));
        return dto;
    }

    public static GameResponseDto convertGame(Game entity) {
        GameResponseDto dto = new GameResponseDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setStartDateTime(entity.getStartDateTime());
        dto.setPlayers(entity.getPlayers().stream().map(Converter::convertUser).collect(Collectors.toList()));
        return dto;
    }
}
