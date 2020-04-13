package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.AddedGroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupAccessResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GroupsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.GroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import com.phoenixoft.teambalanceapp.util.HttpUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/groups")
@AllArgsConstructor
public class GroupController {

    private GroupService groupService;
    private UserService userService;
    private HttpUtils httpUtils;

    @GetMapping
    public GroupsResponseDto getGroups(@RequestParam Long userId) {
        List<Group> groups = groupService.findGroupsByUser(userId);
        return DtoConverter.convertGroups(groups);
    }

    @PostMapping
    public ResponseEntity<AddedGroupResponseDto> saveGroup(@Valid @RequestBody GroupRequestDto dto,
                                                           Authentication authentication) {
        CustomUser user = (CustomUser) authentication.getPrincipal();
        User creatorUser = userService.findById(user.getId());
        Group group = groupService.save(dto, creatorUser);
        return httpUtils.addJwtToResponse(ResponseEntity.ok(), creatorUser).body(DtoConverter.convertAddGroup(group));
    }

    @GetMapping(path = "/{groupId}")
    public GroupResponseDto getGroup(@PathVariable Long groupId) {
        Group entity = groupService.findById(groupId);
        return DtoConverter.convertGroup(entity);
    }

    @PutMapping(path = "/{groupId}")
    public GroupResponseDto updateGroup(@Valid @RequestBody GroupRequestDto dto, @PathVariable Long groupId,
                                        Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        Group entity = groupService.update(groupId, dto);
        return DtoConverter.convertGroup(entity);
    }

    @DeleteMapping(path = "/{groupId}")
    public void deleteGroup(@PathVariable Long groupId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        groupService.delete(groupId);
    }

    @GetMapping(path = "/{groupId}/members")
    public List<UserResponseDto> getMembers(@PathVariable Long groupId) {
        List<User> membersEntityList = groupService.getMembers(groupId);
        return membersEntityList.stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/refs/{groupRef}/members")
    public ResponseEntity<GroupResponseDto> addMember(@PathVariable String groupRef, Authentication authentication) {
        CustomUser userDetails = (CustomUser) authentication.getPrincipal();
        Group entity = groupService.addMemberByGroupRef(groupRef, userDetails.getUsername());
        User user = userService.findById(userDetails.getId());
        return httpUtils.addJwtToResponse(ResponseEntity.ok(), user).body(DtoConverter.convertGroup(entity));
    }

    @PostMapping(path = "/{groupId}/members/{userId}")
    public GroupResponseDto addMember(@PathVariable Long groupId, @PathVariable Long userId) {
        Group entity = groupService.addMember(groupId, userId);
        return DtoConverter.convertGroup(entity);
    }

    @DeleteMapping(path = "/{groupId}/members/{userId}")
    public void deleteMember(@PathVariable Long groupId, @PathVariable Long userId,
                             Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        groupService.deleteMember(groupId, userId);
    }

    @PostMapping(path = "/{groupId}/members/{userId}/addAdminPrivileges")
    public void assignUserToGroupAdmins(@PathVariable Long groupId, @PathVariable Long userId,
                                        Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        // todo refactor to check group existence first
        groupService.assignAdminRoleToUser(groupId, userId);
    }

    @GetMapping(path = "/{groupId}/accessChecks")
    public GroupAccessResponseDto checkAccess(@PathVariable Long groupId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return GroupAccessResponseDto.of(groupService.hasUserAccessToGroup(groupId, userDetails));
    }
}
