package com.phoenixoft.teambalanceapp.group.service;

import com.phoenixoft.teambalanceapp.common.exception.AdminRemovalException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.repository.GroupRepository;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.RoleRepository;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.util.RoleGenerator;
import com.phoenixoft.teambalanceapp.util.StringGenerator;
import lombok.AllArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class GroupService {

    private static final int GROUP_REF_LENGTH = 20;

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StringGenerator stringGenerator;

    public Group save(GroupRequestDto dto, User creatorUser) {
        Group group = new Group();
        group.setName(dto.getName());
        group.getMembers().add(creatorUser);
        group.setRef(stringGenerator.generateRandomStr(GROUP_REF_LENGTH));
        Group createdGroup = groupRepository.save(group);
        createAndAssignGroupRoles(createdGroup.getId(), creatorUser);
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
        groupRepository.findById(groupId).ifPresent(groupRepository::delete);
    }

    public List<User> getMembers(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId))
                .getMembers();
    }

    public Group addMember(String groupRef, String username) {
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

    public void deleteMember(Long groupId, Long deletableMemberId) {
        Group group = findById(groupId);
        User member = userRepository.findById(deletableMemberId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + deletableMemberId));
        checkMemberForRemoval(group, member);
        if (group.removeMember(member)) {
            removeGroupRoles(groupId, member);
            groupRepository.save(group);
        }
    }

    private void checkMemberForRemoval(Group group, User member) {
        if (member.isAdminInGroup(group.getId())) {
            throw new AdminRemovalException(String.format("Cannot remove admin [%s] for group [%s]",
                    member.getId(), group.getId()));
        }
    }

    public List<Game> getGroupGames(Long groupId) {
        return groupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException("Group not found: " + groupId))
                .getGames();
    }

    public void checkAdminPermissions(UserDetails userDetails, Long groupId) {
        String processingGroupAdminRole = RoleGenerator.createAdminRole(groupId);
        Set<SimpleGrantedAuthority> authorities = (Set<SimpleGrantedAuthority>) userDetails.getAuthorities();
        boolean matchAdminRole = authorities.stream().anyMatch(simpleGrantedAuthority -> simpleGrantedAuthority.getAuthority().equals(processingGroupAdminRole));
        if (!matchAdminRole) {
            throw new AccessDeniedException("Admin privileges required.");
        }
    }

    public boolean hasUserAccessToGroup(Long groupId, UserDetails userDetails) {
        String userRole = RoleGenerator.createUserRole(groupId);
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userDetails.getUsername()));
        return user.getRoles().stream().anyMatch(role -> role.getName().equals(userRole));
    }

    public void assignAdminRoleToUser(Long groupId, Long userId) {
        String processingGroupAdminRole = RoleGenerator.createAdminRole(groupId);
        Role existingAdminRole = roleRepository.findByName(processingGroupAdminRole)
                .orElseThrow(() -> new ResourceNotFoundException("Admin role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.getRoles().add(existingAdminRole);
        userRepository.save(user);
    }

    public void assignUserRoleToUser(Long groupId, Long userId) {
        String processingGroupUserRole = RoleGenerator.createUserRole(groupId);
        Role existingUserRole = roleRepository.findByName(processingGroupUserRole)
                .orElseThrow(() -> new ResourceNotFoundException("User role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.addRoles(Collections.singleton(existingUserRole));
        roleRepository.save(existingUserRole);
        userRepository.save(user);
    }

    private void createAndAssignGroupRoles(Long groupId, User creator) {
        Role adminRole = new Role();
        adminRole.setName(RoleGenerator.createAdminRole(groupId));
        Role userRole = new Role();
        userRole.setName(RoleGenerator.createUserRole(groupId));
        creator.addRoles(new HashSet<>(Arrays.asList(adminRole, userRole)));
        roleRepository.save(adminRole);
        roleRepository.save(userRole);
        userRepository.save(creator);
    }

    private void removeGroupRoles(Long groupId, User creator) {
        List<Role> groupRoles = roleRepository.findAllByGroupId(groupId);
        creator.removeRoles(new HashSet<>(groupRoles));
        roleRepository.saveAll(groupRoles);
        userRepository.save(creator);
    }
}
