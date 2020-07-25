package com.phoenixoft.teambalanceapp.group.service;

import com.phoenixoft.teambalanceapp.common.TestData;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GroupRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.repository.GroupRepository;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.RoleRepository;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.StringGenerator;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserGroupServiceTest implements TestData {

    @InjectMocks
    private UserGroupService userGroupService;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private StringGenerator stringGenerator;

    @Test
    public void save() {
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group A");
        long userCreatorId = 25L;
        User user = new User();
        user.setId(userCreatorId);

        Group expectedGroup = new Group();
        expectedGroup.setId(26L);
        when(userService.findById(userCreatorId)).thenReturn(mockUser(userCreatorId));
        when(groupRepository.save(any(Group.class))).thenReturn(expectedGroup);

        Group group = userGroupService.save(dto, userCreatorId);
        assertEquals(expectedGroup, group);
    }

    @Test
    public void findById() {
        long userId = 1L;
        long groupId = 2L;
        Group expectedGroup = new Group();
        expectedGroup.setId(groupId);
        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, expectedGroup));

        Group group = userGroupService.findGroupById(userId, groupId);

        assertEquals(expectedGroup, group);
    }

    @Test
    public void findByIdWhenNotFound() {
        long userId = 1L;
        long groupId = 25L;
        when(userService.findById(userId)).thenReturn(mockUser(userId));

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.findGroupById(userId, groupId));
    }

    @Test
    public void update() {
        long userId = 1L;
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group B");
        long groupId = 2L;
        Group expectedGroup = new Group();
        Group storedGroup = new Group();
        storedGroup.setId(groupId);

        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, storedGroup));
        when(groupRepository.save(storedGroup)).then(invocation -> {
            assertEquals(dto.getName(), storedGroup.getName());
            return expectedGroup;
        });

        Group group = userGroupService.updateGroup(userId, groupId, dto);
        assertEquals(expectedGroup, group);
    }

    @Test
    public void updateWhenGroupNotFound() {
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group C");
        long userId = 1L;
        long groupId = 25L;

        when(userService.findById(userId)).thenReturn(mockUser(userId));

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.updateGroup(userId, groupId, dto));
    }

    @Test
    public void delete() {
        Long userId = 1L;
        Long groupId = 2L;
        Group mockGroup = mockGroup(groupId);
        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, mockGroup));

        userGroupService.deleteGroup(userId, groupId);

        verify(groupRepository).delete(mockGroup);
    }

    @Test
    public void deleteWhenNotFound() {
        Long userId = 1L;
        Long groupId = 2L;
        when(userService.findById(userId)).thenReturn(mockUser(userId));

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.deleteGroup(userId, groupId));
    }

    @Test
    public void getMembers() {
        long userId = 1L;
        long groupId = 2L;
        Group storedGroup = new Group();
        storedGroup.setId(groupId);
        storedGroup.setMembers(Arrays.asList(new User(), new User(), new User()));
        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, storedGroup));

        List<User> members = userGroupService.getGroupMembers(userId, groupId);
        assertEquals(3, members.size());
    }

    @Test
    public void getMembersWhenGroupNotFound() {
        long userId = 1L;
        long groupId = 25L;

        when(userService.findById(userId)).thenReturn(mockUser(userId));

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.getGroupMembers(userId, groupId));
    }

    @Test
    @Disabled
    public void addMemberByGroupRef() {
        String userName = "testName";
        Group group1 = new Group();
        group1.setId(1L);
        Group group2 = new Group();
        group2.setId(2L);
        User expectedUser = new User();
        expectedUser.setGroups(Arrays.asList(group1, group2));
        String requestedGroupRef = "testRef";

        Group expectedGroup = new Group();
        when(groupRepository.findByRef(requestedGroupRef)).thenReturn(Optional.of(expectedGroup));
        when(userRepository.findByEmail(userName)).thenReturn(Optional.of(expectedUser));
        Role expectedAdminRole = new Role();
        when(roleRepository.findByName(anyString())).thenReturn(Optional.of(expectedAdminRole));

        Group group = userGroupService.addMemberByGroupRef(requestedGroupRef, userName);

        assertEquals(expectedGroup, group);
        assertEquals(1, group.getMembers().size());
        assertEquals(expectedUser, group.getMembers().get(0));
    }

    @Test
    public void addMemberWhenUserAlreadyInGroup() {
        long requestedGroupId = 1L;
        String requestedGroupRef = "ref";
        Group group1 = new Group();
        group1.setId(requestedGroupId);
        group1.setRef(requestedGroupRef);
        Group group2 = new Group();
        group2.setId(2L);
        String userName = "test";
        User expectedUser = new User();
        expectedUser.setEmail(userName);
        expectedUser.setGroups(Arrays.asList(group1, group2));


        when(groupRepository.findByRef(requestedGroupRef)).thenReturn(Optional.of(group1));
        when(userRepository.findByEmail(userName)).thenReturn(Optional.of(expectedUser));

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.addMemberByGroupRef(requestedGroupRef, userName));
    }

    @Test
    public void addMemberWhenGroupNotFound() {
        String requestedGroupRef = "ref";

        when(groupRepository.findByRef(requestedGroupRef)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userGroupService.addMemberByGroupRef(requestedGroupRef, null));
    }

    @Test
    public void deleteMember() {
        long userId = 1L;
        long groupId = 25L;
        long deletableUserId = 26L;
        User deletableUser = new User();
        deletableUser.setId(deletableUserId);
        User user2 = new User();
        user2.setId(99L);

        Group expectedGroup = new Group();
        expectedGroup.setId(groupId);
        expectedGroup.setMembers(new LinkedList<>(Arrays.asList(deletableUser, user2)));
        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, expectedGroup));
        when(userService.findById(deletableUserId)).thenReturn(deletableUser);
        when(groupRepository.save(expectedGroup)).then(invocation -> {
            assertFalse(expectedGroup.getMembers().contains(deletableUser));
            assertEquals(1, expectedGroup.getMembers().size());
            return expectedGroup;
        });

        userGroupService.deleteGroupMember(userId, groupId, deletableUserId);
    }

    @Test
    public void getGroupGames() {
        long userId = 1L;
        long groupId = 2L;

        Group expectedGroup = new Group();
        expectedGroup.setId(groupId);
        ArrayList<Game> expectedGames = new ArrayList<>();
        expectedGames.add(new Game());
        expectedGames.add(new Game());
        expectedGroup.setGames(expectedGames);
        when(userService.findById(userId)).thenReturn(mockUserWithGroup(userId, expectedGroup));

        List<Game> groupGames = userGroupService.getGroupGames(userId, groupId);

        assertEquals(2, groupGames.size());
        assertEquals(expectedGames, groupGames);
    }
}
