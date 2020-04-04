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
        User memberToDelete = userRepository.findById(deletableMemberId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + deletableMemberId));
        checkMemberForRemoval(group, memberToDelete);
        if (group.removeMember(memberToDelete)) {
            revokeGroupPrivilegesFromMember(groupId, memberToDelete);
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
        String processingGroupAdminRole = RoleGenerator.createAdminRoleTitle(groupId);
        Set<SimpleGrantedAuthority> authorities = (Set<SimpleGrantedAuthority>) userDetails.getAuthorities();
        boolean matchAdminRole = authorities.stream().anyMatch(simpleGrantedAuthority -> simpleGrantedAuthority.getAuthority().equals(processingGroupAdminRole));
        if (!matchAdminRole) {
            throw new AccessDeniedException("Admin privileges required.");
        }
    }

    public boolean hasUserAccessToGroup(Long groupId, UserDetails userDetails) {
        String userRole = RoleGenerator.createUserRoleTitle(groupId);
        String adminRole = RoleGenerator.createAdminRoleTitle(groupId);
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userDetails.getUsername()));
        return user.getRoles().stream().anyMatch(role -> role.getName().equals(userRole) || role.getName().equals(adminRole));
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

    public void assignAdminRoleToUser(Long groupId, Long userId) {
        String processingGroupAdminRole = RoleGenerator.createAdminRoleTitle(groupId);
        Role existingAdminRole = roleRepository.findByName(processingGroupAdminRole)
                .orElseThrow(() -> new ResourceNotFoundException("Admin role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        existingAdminRole.getUsers().add(user);
        roleRepository.save(existingAdminRole);
    }

    public void assignUserRoleToUser(Long groupId, Long userId) {
        String processingGroupUserRole = RoleGenerator.createUserRoleTitle(groupId);
        Role existingAdminRole = roleRepository.findByName(processingGroupUserRole)
                .orElseThrow(() -> new ResourceNotFoundException("User role for the group not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        existingAdminRole.getUsers().add(user);
        roleRepository.save(existingAdminRole);
    }

}
