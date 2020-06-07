package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.TestData;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.GroupService;
import com.phoenixoft.teambalanceapp.user.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Game service tests")
public class GameServiceTest implements TestData {

    @InjectMocks
    private GameService gameService;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private GroupService groupService;

    @Mock
    private TeamBalancer teamBalancer;

    @Test
    @DisplayName("Should save game")
    public void testSave() {
        GameRequestDto dto = new GameRequestDto();
        dto.setName("test game");
        dto.setStartDateTime(LocalDateTime.of(2019, 12, 12, 12, 0));

        long groupId = 1L;
        Group mockGroup = mockGroup(groupId);
        when(groupService.findById(groupId)).thenReturn(mockGroup);
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.save(groupId, dto);

        assertEquals("test game", game.getName());
        assertEquals(LocalDateTime.of(2019, 12, 12, 12, 0), game.getStartDateTime());
    }

    @Test
    @DisplayName("Should find game")
    public void testFind() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(Collections.singletonList(mockGame(gameId)));
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        Game game = gameService.findGameInGroup(groupId, gameId);

        assertEquals(gameId, game.getId());
    }

    @Test
    @DisplayName("Test find: Should throw exception if game wasn't found")
    public void testFind_gameNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(new ArrayList<>());
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.findGameInGroup(groupId, gameId));
    }

    @Test
    @DisplayName("Should update game")
    public void testUpdate() {
        GameRequestDto dto = new GameRequestDto();
        dto.setName("test game 2");
        dto.setStartDateTime(LocalDateTime.of(2019, 12, 12, 13, 0));

        long groupId = 1L;
        Group mockGroup = mockGroup(groupId);
        long gameId = 2L;
        mockGroup.setGames(Collections.singletonList(mockGame(gameId)));
        when(groupService.findById(groupId)).thenReturn(mockGroup);
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.updateGame(groupId, gameId, dto);

        assertEquals("test game 2", game.getName());
        assertEquals(LocalDateTime.of(2019, 12, 12, 13, 0), game.getStartDateTime());
    }

    @Test
    @DisplayName("Test update: Should throw exception if game wasn't found")
    public void testUpdate_gameNotFound() {
        long groupId = 1L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(Collections.EMPTY_LIST);
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.updateGame(groupId, 2L, new GameRequestDto()));
    }

    @Test
    @DisplayName("Should delete game")
    public void testDelete() {
        long groupId = 1L;
        Group mockGroup = mockGroup(groupId);
        long gameId1 = 2L;
        long gameId2 = 3L;
        ArrayList<Game> games = new ArrayList<>();
        games.add(mockGame(gameId1));
        games.add(mockGame(gameId2));
        mockGroup.setGames(games);
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        gameService.delete(groupId, gameId1);

        verify(gameRepository).deleteById(gameId1);
    }

    @Test
    @DisplayName("Test delete: Should throw exception if game wasn't found")
    public void testDelete_gameNotFound() {
        long groupId = 1L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(Collections.EMPTY_LIST);
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.delete(groupId, 2L));
    }

    @Test
    @DisplayName("Should get game players")
    public void testGetGamePlayers() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        Game game = mockGame(gameId);
        long userId = 3L;
        game.setPlayers(Collections.singletonList(mockUser(userId)));
        mockGroup.setGames(Collections.singletonList(game));
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        List<User> gamePlayers = gameService.getGamePlayers(groupId, gameId);

        assertEquals(1, gamePlayers.size());
        assertEquals(userId, gamePlayers.get(0).getId());
    }

    @Test
    @DisplayName("Test get game players: Should throw exception if game wasn't found")
    public void testGetGamePlayers_gameNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(new ArrayList<>());
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.getGamePlayers(groupId, gameId));
    }

    @Test
    @DisplayName("Should add player to game")
    public void testAddPlayerToGame() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        long userId = 3L;
        mockGroup.setMembers(Collections.singletonList(mockUser(userId)));
        Game mockGame = mockGame(gameId);
        mockGame.setPlayers(new ArrayList<>(1));
        mockGroup.setGames(Collections.singletonList(mockGame));
        when(groupService.findById(groupId)).thenReturn(mockGroup);
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.addPlayerToGame(groupId, gameId, userId);

        assertEquals(1, game.getPlayers().size());
        assertEquals(userId, game.getPlayers().get(0).getId());
    }

    @Test
    @DisplayName("Test add game player: Should throw exception if member wasn't found")
    public void testAddPlayerToGame_memberNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setMembers(Collections.EMPTY_LIST);
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.addPlayerToGame(groupId, gameId, 3L));
    }

    @Test
    @DisplayName("Test add game player: Should throw exception if game wasn't found")
    public void testAddPlayerToGame_gameNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        long userId = 3L;
        mockGroup.setMembers(Collections.singletonList(mockUser(userId)));
        mockGroup.setGames(Collections.EMPTY_LIST);
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.addPlayerToGame(groupId, gameId, userId));
    }

    @Test
    @DisplayName("Should delete player from game")
    public void testDeletePlayerFromGame() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        Game mockGame = mockGame(gameId);
        long userId = 3L;
        mockGame.setPlayers(new ArrayList<>(Collections.singletonList(mockUser(userId))));
        mockGroup.setGames(Collections.singletonList(mockGame));
        when(groupService.findById(groupId)).thenReturn(mockGroup);
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = gameService.deletePlayerFromGame(groupId, gameId, userId);

        assertTrue(game.getPlayers().isEmpty());
    }

    @Test
    @DisplayName("Should not delete any player from game if id is incorrect")
    public void testDeletePlayerFromGame_removeNotExistPlayer() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        Game mockGame = mockGame(gameId);
        long userId = 3L;
        mockGame.setPlayers(new ArrayList<>(Collections.singletonList(mockUser(userId))));
        mockGroup.setGames(Collections.singletonList(mockGame));
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        Game game = gameService.deletePlayerFromGame(groupId, gameId, userId + 1);

        assertEquals(1, game.getPlayers().size());
    }

    @Test
    @DisplayName("Should generate balanced teams")
    public void testGenerateBalancedTeams() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        Game mockGame = mockGame(gameId);
        long userId = 3L;
        List<User> players = Collections.singletonList(mockUser(userId));
        mockGame.setPlayers(players);
        mockGroup.setGames(Collections.singletonList(mockGame));
        when(groupService.findById(groupId)).thenReturn(mockGroup);
        when(teamBalancer.dividePlayersIntoBalancedTeams(players)).thenReturn(Collections.singletonList(Team.of(players)));

        List<Team> teams = gameService.generateBalancedTeams(groupId, gameId);

        assertEquals(1, teams.size());
        assertEquals(userId, teams.get(0).getPlayers().get(0).getId());
    }

    @Test
    @DisplayName("Test generate balanced teams: Should throw exception if game wasn't found")
    public void testGenerateBalancedTeams_gameNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setGames(new ArrayList<>());
        when(groupService.findById(groupId)).thenReturn(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> gameService.generateBalancedTeams(groupId, gameId));
    }
}
