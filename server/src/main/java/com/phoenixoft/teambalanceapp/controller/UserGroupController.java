package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.AddedGroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupAccessResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.service.UserGameService;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.UserGroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import com.phoenixoft.teambalanceapp.util.HttpUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/userGroups")
@AllArgsConstructor
public class UserGroupController {

    private final UserGroupService userGroupService;
    private final UserGameService userGameService;
    private final HttpUtils httpUtils;

    @GetMapping
    public GroupsResponseDto getGroups(@RequestAttribute CustomUser currentCustomUser) {
        List<Group> groups = userGroupService.findGroupsByUser(currentCustomUser.getId());
        return DtoConverter.convertGroups(groups);
    }

    @PostMapping
    public ResponseEntity<AddedGroupResponseDto> saveGroup(@Valid @RequestBody GroupRequestDto dto,
                                                           @RequestAttribute CustomUser currentCustomUser) {
        Group group = userGroupService.save(dto, currentCustomUser.getId());
        return httpUtils.addJwtToResponse(ResponseEntity.ok(), currentCustomUser.getId())
                .body(DtoConverter.convertAddGroup(group));
    }

    @GetMapping(path = "/{groupId}")
    public GroupResponseDto getGroup(@PathVariable Long groupId, @RequestAttribute CustomUser currentCustomUser) {
        Group entity = userGroupService.findGroupById(currentCustomUser.getId(), groupId);
        return DtoConverter.convertGroup(entity);
    }

    @PutMapping(path = "/{groupId}")
    public GroupResponseDto updateGroup(@Valid @RequestBody GroupRequestDto dto, @PathVariable Long groupId,
                                        @RequestAttribute CustomUser currentCustomUser) {
        userGroupService.checkAdminPermissions(currentCustomUser, groupId);
        Group entity = userGroupService.updateGroup(currentCustomUser.getId(), groupId, dto);
        return DtoConverter.convertGroup(entity);
    }

    @DeleteMapping(path = "/{groupId}")
    public void deleteGroup(@PathVariable Long groupId, @RequestAttribute CustomUser currentCustomUser) {
        userGroupService.checkAdminPermissions(currentCustomUser, groupId);
        userGroupService.deleteGroup(currentCustomUser.getId(), groupId);
    }

    @GetMapping(path = "/{groupId}/games")
    public List<GameResponseDto> getGroupGames(@PathVariable Long groupId, @RequestAttribute CustomUser currentCustomUser) {
        List<Game> membersEntityList = userGroupService.getGroupGames(currentCustomUser.getId(), groupId);
        return membersEntityList.stream()
                .map(DtoConverter::convertGame)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{groupId}/games")
    public GameResponseDto saveGame(@PathVariable Long groupId, @Valid @RequestBody GameRequestDto dto,
                                    @RequestAttribute CustomUser currentCustomUser) {
        userGroupService.checkAdminPermissions(currentCustomUser, groupId);
        Game entity = userGameService.save(currentCustomUser.getId(), groupId, dto);
        return DtoConverter.convertGame(entity);
    }

    @GetMapping(path = "/{groupId}/members")
    public List<UserResponseDto> getMembers(@PathVariable Long groupId, @RequestAttribute CustomUser currentCustomUser) {
        List<User> membersEntityList = userGroupService.getGroupMembers(currentCustomUser.getId(), groupId);
        return membersEntityList.stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/refs/{groupRef}/members")
    public ResponseEntity<GroupResponseDto> addMember(@PathVariable String groupRef,
                                                      @RequestAttribute CustomUser currentCustomUser) {
        Group entity = userGroupService.addMemberByGroupRef(groupRef, currentCustomUser.getUsername());
        return httpUtils.addJwtToResponse(ResponseEntity.ok(), currentCustomUser.getId())
                .body(DtoConverter.convertGroup(entity));
    }

    @DeleteMapping(path = "/{groupId}/members/{userId}")
    public ResponseEntity<?> deleteMember(@PathVariable Long groupId, @PathVariable Long userId,
                                          @RequestAttribute CustomUser currentCustomUser) {
        userGroupService.checkAdminPermissions(currentCustomUser, groupId);
        userGroupService.deleteGroupMember(currentCustomUser.getId(), groupId, userId);
        return httpUtils.addJwtToResponse(ResponseEntity.ok(), currentCustomUser.getId()).build();
    }

    @PostMapping(path = "/{groupId}/members/{userId}/addAdminPrivileges")
    public void assignUserToGroupAdmins(@PathVariable Long groupId, @PathVariable Long userId,
                                        @RequestAttribute CustomUser currentCustomUser) {
        userGroupService.findGroupById(currentCustomUser.getId(), groupId);
        userGroupService.checkAdminPermissions(currentCustomUser, groupId);
        userGroupService.assignAdminRoleToUser(groupId, userId);
    }

    @GetMapping(path = "/{groupId}/accessChecks")
    public GroupAccessResponseDto checkAccess(@PathVariable Long groupId, @RequestAttribute CustomUser currentCustomUser) {
        return GroupAccessResponseDto.of(userGroupService.hasUserAccessToGroup(groupId, currentCustomUser));
    }
}
