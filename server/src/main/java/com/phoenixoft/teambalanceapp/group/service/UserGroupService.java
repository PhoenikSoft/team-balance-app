package com.phoenixoft.teambalanceapp.group.service;

import com.phoenixoft.teambalanceapp.common.exception.AdminRemovalException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.repository.GroupRepository;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.RoleRepository;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.RoleGenerator;
import com.phoenixoft.teambalanceapp.util.StringGenerator;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserGroupService {

    private static final int GROUP_REF_LENGTH = 20;

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final StringGenerator stringGenerator;

    public Group save(GroupRequestDto dto, Long creatorUserId) {
        User creatorUser = userService.findById(creatorUserId);
        Group group = new Group();
        group.setName(dto.getName());
        group.getMembers().add(creatorUser);
        group.setRef(generateGroupRef());
        Group createdGroup = groupRepository.save(group);
        createAndAssignGroupRoles(createdGroup.getId(), creatorUser);
        return createdGroup;
    }

    public List<Group> findGroupsByUser(Long userId) {
        return userService.findById(userId).getGroups();
    }

    public Group findGroupById(Long userId, Long groupId) {
        return findGroupsByUser(userId)
                .stream()
                .filter(group -> group.getId().equals(groupId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId));
    }

    public Group updateGroup(Long userId, Long groupId, GroupRequestDto dto) {
        Group storedGroup = findGroupById(userId, groupId);
        storedGroup.setName(dto.getName());
        return groupRepository.save(storedGroup);
    }

    public void deleteGroup(Long userId, Long groupId) {
        Group group = findGroupById(userId, groupId);
        groupRepository.delete(group);
        deleteGroupRoles(groupId);
    }

    public List<User> getGroupMembers(Long userId, Long groupId) {
        return findGroupById(userId, groupId).getMembers();
    }

    public Group addMemberByGroupRef(String groupRef, String username) {
        Group group = groupRepository.findByRef(groupRef)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found by ref: " + groupRef));
        User newMember = userRepository.findByEmail(username)
                .filter(user -> user.getGroups().stream().noneMatch(userGroup -> userGroup.getId().equals(group.getId())))
                .orElseThrow(() -> new ResourceNotFoundException("User not found for email: " + username));
        group.getMembers().add(newMember);
        assignUserRoleToUser(group.getId(), newMember.getId());
        groupRepository.save(group);
        return group;
    }

    public void deleteGroupMember(Long userId, Long groupId, Long deletableMemberId) {
        Group group = findGroupById(userId, groupId);
        User memberToDelete = userService.findById(deletableMemberId);
        checkMemberForRemoval(group, memberToDelete);
        if (group.removeMember(memberToDelete)) {
            revokeGroupPrivilegesFromMember(groupId, memberToDelete);
            groupRepository.save(group);
            userRepository.save(memberToDelete);
        }
    }

    public List<Game> getGroupGames(Long userId, Long groupId) {
        return findGroupById(userId, groupId).getGames();
    }

    public void checkRemoveMemberPermissions(CustomUser userDetails, Long userId, Long groupId) {
        boolean hasAdminPermissions = hasAdminPermissions(userDetails, groupId);
        boolean removeCurrentUser = userDetails.getId().equals(userId);
        boolean canRemoveMember = (hasAdminPermissions && !removeCurrentUser) || (!hasAdminPermissions && removeCurrentUser);
        if (!canRemoveMember) {
            throw new AccessDeniedException("You don't have \"remove member\" permissions");
        }
    }

    public void checkAdminPermissions(UserDetails userDetails, Long groupId) {
        if (!hasAdminPermissions(userDetails, groupId)) {
            throw new AccessDeniedException("Admin privileges required.");
        }
    }

    private boolean hasAdminPermissions(UserDetails userDetails, Long groupId) {
        String processingGroupAdminRole = RoleGenerator.createAdminRoleTitle(groupId);
        Set<SimpleGrantedAuthority> authorities = (Set<SimpleGrantedAuthority>) userDetails.getAuthorities();
        return authorities.stream().anyMatch(simpleGrantedAuthority -> simpleGrantedAuthority.getAuthority().equals(processingGroupAdminRole));
    }

    private void createAndAssignGroupRoles(Long groupId, User creator) {
        Role adminRole = new Role();
        adminRole.setName(RoleGenerator.createAdminRoleTitle(groupId));
        Role userRole = new Role();
        userRole.setName(RoleGenerator.createUserRoleTitle(groupId));
        creator.addRoles(new HashSet<>(Arrays.asList(adminRole, userRole)));
        roleRepository.save(adminRole);
        roleRepository.save(userRole);
    }

    private void deleteGroupRoles(Long groupId) {
        List<Role> groupRoles = roleRepository.findAllByGroupId(groupId);
        for (Role role : groupRoles) {
            roleRepository.delete(role);
        }
    }

    private void revokeGroupPrivilegesFromMember(Long groupId, User memberToDelete) {
        List<Role> groupRoles = roleRepository.findAllByGroupId(groupId);
        memberToDelete.removeRoles(new HashSet<>(groupRoles));
        roleRepository.saveAll(groupRoles);
    }

    public void assignUserRoleToUser(Long groupId, Long userId) {
        String processingGroupUserRole = RoleGenerator.createUserRoleTitle(groupId);
        Role existingAdminRole = roleRepository.findByName(processingGroupUserRole)
                .orElseThrow(() -> new ResourceNotFoundException("User role for the group not found"));
        User user = userService.findById(userId);
        existingAdminRole.getUsers().add(user);
        roleRepository.save(existingAdminRole);
    }

    private void checkMemberForRemoval(Group group, User member) {
        if (member.isAdminInGroup(group.getId())) {
            throw new AdminRemovalException(String.format("Cannot remove admin [%s] for group [%s]",
                    member.getId(), group.getId()));
        }
    }

    private String generateGroupRef() {
        String groupRef;
        do {
            groupRef = stringGenerator.generateRandomStr(GROUP_REF_LENGTH);
        } while (groupRepository.findByRef(groupRef).isPresent());
        return groupRef;
    }
}
