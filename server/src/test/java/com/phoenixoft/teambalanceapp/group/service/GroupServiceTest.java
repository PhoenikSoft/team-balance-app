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
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class GroupServiceTest {

    @InjectMocks
    private GroupService groupService;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Test
    public void save() {
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group A");
        long userCreatorId = 25L;
        User user = new User();
        user.setId(userCreatorId);

        Group expectedGroup = new Group();
        expectedGroup.setId(26L);
        when(groupRepository.save(any(Group.class))).thenReturn(expectedGroup);

        Group group = groupService.save(dto, user);
        assertEquals(expectedGroup, group);
    }

    @Test
    public void findById() {
        long groupId = 25L;
        Group expectedGroup = new Group();
        when(groupRepository.findById(groupId)).thenReturn(Optional.of(expectedGroup));

        Group group = groupService.findById(groupId);

        assertEquals(expectedGroup, group);
    }

    @Test
    public void findByIdWhenNotFound() {
        long groupId = 25L;
        when(groupRepository.findById(groupId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> groupService.findById(groupId));
    }

    @Test
    public void update() {
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group B");
        long groupId = 25L;
        Group expectedGroup = new Group();
        Group storedGroup = new Group();

        when(groupRepository.findById(groupId)).thenReturn(Optional.of(storedGroup));
        when(groupRepository.save(storedGroup)).then(invocation -> {
            assertEquals(dto.getName(), storedGroup.getName());
            return expectedGroup;
        });

        Group group = groupService.update(groupId, dto);
        assertEquals(expectedGroup, group);
    }

    @Test
    public void updateWhenGroupNotFound() {
        GroupRequestDto dto = new GroupRequestDto();
        dto.setName("Group C");
        long groupId = 25L;

        when(groupRepository.findById(groupId)).thenReturn(Optional.empty());


        assertThrows(ResourceNotFoundException.class, () -> groupService.update(groupId, dto));
    }

    @Test
    public void delete() {
        Long groupId = 25L;

        Optional<Group> expectedGroup = Optional.of(new Group());
        when(groupRepository.findById(groupId)).thenReturn(expectedGroup);

        groupService.delete(groupId);

        verify(groupRepository).delete(expectedGroup.get());
    }

    @Test
    public void deleteWhenNotFound() {
        Long groupId = 25L;

        when(groupRepository.findById(groupId)).thenReturn(Optional.empty());

        groupService.delete(groupId);

        verify(groupRepository, times(0)).delete(any());
    }

    @Test
    public void getMembers() {
        long groupId = 25L;

        Group storedGroup = new Group();
        storedGroup.setMembers(Arrays.asList(new User(), new User(), new User()));
        Optional<Group> expectedGroup = Optional.of(storedGroup);
        when(groupRepository.findById(groupId)).thenReturn(expectedGroup);

        List<User> members = groupService.getMembers(groupId);
        assertEquals(3, members.size());
    }

    @Test
    public void getMembersWhenGroupNotFound() {
        long groupId = 25L;

        when(groupRepository.findById(groupId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> groupService.getMembers(groupId));
    }

    @Test
    public void addMember() {
        long userId = 25L;
        Group group1 = new Group();
        group1.setId(1L);
        Group group2 = new Group();
        group2.setId(2L);
        User expectedUser = new User();
        expectedUser.setGroups(Arrays.asList(group1, group2));
        long requestedGroupId = 3L;

        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));
        Group expectedGroup = new Group();
        when(groupRepository.findById(requestedGroupId)).thenReturn(Optional.of(expectedGroup));
        Role expectedAdminRole = new Role();
        when(roleRepository.findByName(anyString())).thenReturn(Optional.of(expectedAdminRole));

        Group group = groupService.addMember(requestedGroupId, userId);

        assertEquals(expectedGroup, group);
        assertEquals(1, group.getMembers().size());
        assertEquals(expectedUser, group.getMembers().get(0));
    }

    @Test
    public void addMemberWhenUserAlreadyInGroup() {
        long userId = 25L;
        long requestedGroupId = 1L;
        Group group1 = new Group();
        group1.setId(requestedGroupId);
        Group group2 = new Group();
        group2.setId(2L);
        User expectedUser = new User();
        expectedUser.setGroups(Arrays.asList(group1, group2));

        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

        assertThrows(ResourceNotFoundException.class, () -> groupService.addMember(requestedGroupId, userId));
    }

    @Test
    public void addMemberWhenGroupNotFound() {
        long userId = 25L;
        User expectedUser = new User();
        long requestedGroupId = 3L;

        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));
        when(groupRepository.findById(requestedGroupId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> groupService.addMember(requestedGroupId, userId));
    }

    @Test
    public void deleteMember() {
        long groupId = 25L;
        long userId = 26L;
        User user = new User();
        user.setId(userId);
        User user2 = new User();
        user2.setId(99L);

        Group expectedGroup = new Group();
        expectedGroup.setMembers(new LinkedList<>(Arrays.asList(user, user2)));
        when(groupRepository.findById(groupId)).thenReturn(Optional.of(expectedGroup));
        when(groupRepository.save(expectedGroup)).then(invocation -> {
            assertFalse(expectedGroup.getMembers().contains(user));
            assertEquals(1, expectedGroup.getMembers().size());
            return expectedGroup;
        });

        groupService.deleteMember(groupId, userId);
    }

    @Test
    public void getGroupGames() {
        long groupId = 25L;

        Group expectedGroup = new Group();
        ArrayList<Game> expectedGames = new ArrayList<>();
        expectedGames.add(new Game());
        expectedGames.add(new Game());
        expectedGroup.setGames(expectedGames);
        when(groupRepository.findById(groupId)).thenReturn(Optional.of(expectedGroup));

        List<Game> groupGames = groupService.getGroupGames(groupId);

        assertEquals(2, groupGames.size());
        assertEquals(expectedGames, groupGames);
    }
}
