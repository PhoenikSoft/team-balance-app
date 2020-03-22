package com.phoenixoft.teambalanceapp.group.service;

import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.repository.GroupRepository;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.RoleRepository;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
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
public class GroupService {

    public static final String ADMIN_ROLE_PREFIX = "ADMIN_ROLE_";
    public static final String USER_ROLE_PREFIX = "USER_ROLE_";

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public Group save(GroupRequestDto dto, Long userCreatorId) {
        Group group = new Group();
        group.setName(dto.getName());
        User creator = userRepository.findById(userCreatorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userCreatorId));
        group.getMembers().add(creator);
        Group createdGroup = groupRepository.save(group);
        createAndAssignGroupRoles(createdGroup.getId(), creator);
        return createdGroup;
    }

    public List<Group> findGroupsByUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId))
                .getGroups();
    }

    public Group findById(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId));
    }

    public Group update(Long groupId, GroupRequestDto dto) {
        Group storedGroup = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId));
        storedGroup.setName(dto.getName());
        return groupRepository.save(storedGroup);
    }

    public void delete(Long groupId) {
        groupRepository.findById(groupId).ifPresent(group -> {
            groupRepository.delete(group);
            deleteGroupRoles(groupId);
        });
    }

    public List<User> getMembers(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId))
                .getMembers();
    }

    public Group addMember(Long groupId, Long userId) {
        User newMember = userRepository.findById(userId)
                .filter(user -> user.getGroups().stream().noneMatch(group -> group.getId().equals(groupId)))
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId));
        group.getMembers().add(newMember);
        assignUserRoleToUser(groupId, userId);
        groupRepository.save(group);
        return group;
    }

    public void deleteMember(Long groupId, Long deletableMemberId) {
        Group group = findById(groupId);
        if (group.removeMember(deletableMemberId)) {
            groupRepository.save(group);
        }
    }

    public List<Game> getGroupGames(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId))
                .getGames();
    }

    public void checkAdminPermissions(UserDetails userDetails, Long groupId) {
        String processingGroupAdminRole = ADMIN_ROLE_PREFIX + groupId;
        Set<SimpleGrantedAuthority> authorities = (Set<SimpleGrantedAuthority>) userDetails.getAuthorities();
        boolean matchAdminRole = authorities.stream().anyMatch(simpleGrantedAuthority -> simpleGrantedAuthority.getAuthority().equals(processingGroupAdminRole));
        if (!matchAdminRole) {
            throw new AccessDeniedException("Admin privileges required.");
        }
    }

    private void createAndAssignGroupRoles(Long groupId, User creator) {
        Role adminRole = new Role();
        adminRole.setName(ADMIN_ROLE_PREFIX + groupId);
        adminRole.getUsers().add(creator);
        roleRepository.save(adminRole);
        Role userRole = new Role();
        userRole.setName(USER_ROLE_PREFIX + groupId);
        userRole.getUsers().add(creator);
        roleRepository.save(userRole);
    }

    private void deleteGroupRoles(Long groupId) {
        String adminRoleName = ADMIN_ROLE_PREFIX + groupId;
        roleRepository.findByName(adminRoleName).ifPresent(role -> {
            role.getUsers().forEach(user -> {
                user.removeRole(role);
            });
            roleRepository.delete(role);
        });
        String userRoleName = USER_ROLE_PREFIX + groupId;
        roleRepository.findByName(userRoleName).ifPresent(role -> {
            role.getUsers().forEach(user -> {
                user.removeRole(role);
            });
            roleRepository.delete(role);
        });
    }

    public void assignAdminRoleToUser(Long groupId, Long userId) {
        String processingGroupAdminRole = ADMIN_ROLE_PREFIX + groupId;
        Role existingAdminRole = roleRepository.findByName(processingGroupAdminRole)
                .orElseThrow(() -> new ResourceNotFoundException("Admin role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        existingAdminRole.getUsers().add(user);
        roleRepository.save(existingAdminRole);
    }

    public void assignUserRoleToUser(Long groupId, Long userId) {
        String processingGroupAdminRole = USER_ROLE_PREFIX + groupId;
        Role existingAdminRole = roleRepository.findByName(processingGroupAdminRole)
                .orElseThrow(() -> new ResourceNotFoundException("User role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        existingAdminRole.getUsers().add(user);
        roleRepository.save(existingAdminRole);
    }

}
