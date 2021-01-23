package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.TestData;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.BalancedTeams;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.GameBalancing;
import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.model.BalancingConfig;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.UserGroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Game service tests")
public class UserGameServiceTest implements TestData {

    private UserGameService userGameService;

    @Mock
    private GameRepository gameRepository;

    @Mock
    private UserGroupService userGroupService;

    @Mock
    private TeamBalancer teamBalancer;

    @Mock
    private TeamBalancer randomTeamBalancer;

    @Mock
    private UserVoteService userVoteService;

    @BeforeEach
    void beforeEach() {
        userGameService = new UserGameService(gameRepository, userGroupService, teamBalancer, randomTeamBalancer, userVoteService);
    }

    @Test
    @DisplayName("Should save game")
    public void testSave() {
        GameRequestDto dto = new GameRequestDto();
        dto.setName("test game");
        dto.setStartDateTime(LocalDateTime.of(2019, 12, 12, 12, 0));

        long groupId = 1L;
        long userId = 2L;
        Group mockGroup = mockGroup(groupId);
        when(userGroupService.findGroupById(userId, groupId)).thenReturn(mockGroup);
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = userGameService.save(userId, groupId, dto);

        assertEquals("test game", game.getName());
        assertEquals(LocalDateTime.of(2019, 12, 12, 12, 0), game.getStartDateTime());
    }

    @Test
    @DisplayName("Should find game")
    public void testFind() {
        long gameId = 1L;
        long userId = 2L;
        when(gameRepository.findById(gameId))
                .thenReturn(Optional.of(mockGameWithGroupMember(gameId, 0L, userId)));

        Game game = userGameService.findUserGame(userId, gameId);

        assertEquals(gameId, game.getId());
    }

    @Test
    @DisplayName("Test find: Should throw exception if game wasn't found")
    public void testFind_gameNotFound() {
        long userId = 1L;
        long gameId = 2L;

        assertThrows(ResourceNotFoundException.class, () -> userGameService.findUserGame(userId, gameId));
    }

    @Test
    @DisplayName("Should update game")
    public void testUpdate() {
        GameRequestDto dto = new GameRequestDto();
        dto.setName("test game 2");
        dto.setStartDateTime(LocalDateTime.of(2019, 12, 12, 13, 0));

        long userId = 1L;
        long gameId = 2L;
        when(gameRepository.findById(gameId))
                .thenReturn(Optional.of(mockGameWithGroupMember(gameId, 0L, userId)));
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = userGameService.updateGame(userId, gameId, dto);

        assertEquals("test game 2", game.getName());
        assertEquals(LocalDateTime.of(2019, 12, 12, 13, 0), game.getStartDateTime());
    }

    @Test
    @DisplayName("Test update: Should throw exception if game wasn't found")
    public void testUpdate_gameNotFound() {
        long userId = 1L;
        long gameId = 2L;

        assertThrows(ResourceNotFoundException.class, () -> userGameService.updateGame(userId, gameId, new GameRequestDto()));
    }

    @Test
    @DisplayName("Should delete game")
    public void testDelete() {
        long userId = 1L;
        long gameId = 2L;
        CustomUser customUser = new CustomUser(userId, "a", "a", Collections.EMPTY_LIST);
        Game mockGame = mockGame(gameId);
        mockGame.setGroup(mockGroup(3L));
        when(gameRepository.findById(gameId))
                .thenReturn(Optional.of(mockGameWithGroupMember(gameId, 0L, userId)));

        userGameService.deleteGame(customUser, gameId);

        verify(gameRepository).deleteById(gameId);
    }

    @Test
    @DisplayName("Test delete: Should throw exception if game wasn't found")
    public void testDelete_gameNotFound() {
        long userId = 1L;
        CustomUser customUser = new CustomUser(userId, "a", "a", Collections.EMPTY_LIST);
        long gameId = 1L;

        assertThrows(ResourceNotFoundException.class, () -> userGameService.deleteGame(customUser, gameId));
    }

    @Test
    @DisplayName("Should get game players")
    public void testGetGamePlayers() {
        long currentUserId = 1L;
        long gameId = 2L;
        Game game = mockGameWithGroupMember(gameId, 0L, currentUserId);
        long userId = 3L;
        game.setPlayers(Collections.singletonList(mockUser(userId)));
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(game));

        List<User> gamePlayers = userGameService.getGamePlayers(currentUserId, gameId);

        assertEquals(1, gamePlayers.size());
        assertEquals(userId, gamePlayers.get(0).getId());
    }

    @Test
    @DisplayName("Test get game players: Should throw exception if game wasn't found")
    public void testGetGamePlayers_gameNotFound() {
        long userId = 1L;
        long gameId = 2L;

        assertThrows(ResourceNotFoundException.class, () -> userGameService.getGamePlayers(userId, gameId));
    }

    @Test
    @DisplayName("Should add player to game")
    public void testAddPlayerToGame() {
        long userId = 1L;
        long gameId = 2L;
        long playerId = 3L;
        long groupId = 4L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setMembers(Arrays.asList(mockUser(playerId), mockUser(userId)));
        Game mockGame = mockGame(gameId);
        mockGame.setGroup(mockGroup);
        mockGame.setPlayers(new ArrayList<>(1));
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = userGameService.addPlayerToGame(userId, gameId, playerId);

        assertEquals(1, game.getPlayers().size());
        assertEquals(playerId, game.getPlayers().get(0).getId());
    }

    @Test
    @DisplayName("Test add game player: Should throw exception if member wasn't found")
    public void testAddPlayerToGame_memberNotFound() {
        long groupId = 1L;
        long gameId = 2L;
        long userId = 3L;
        Group mockGroup = mockGroup(groupId);
        mockGroup.setMembers(Collections.EMPTY_LIST);
        Game game = mockGame(gameId);
        game.setGroup(mockGroup);

        assertThrows(ResourceNotFoundException.class, () -> userGameService.addPlayerToGame(userId, gameId, 3L));
    }

    @Test
    @DisplayName("Test add game player: Should throw exception if game wasn't found")
    public void testAddPlayerToGame_gameNotFound() {
        long userId = 1L;
        long gameId = 2L;
        long playerId = 3L;

        assertThrows(ResourceNotFoundException.class, () -> userGameService.addPlayerToGame(userId, gameId, playerId));
    }

    @Test
    @DisplayName("Should delete player from game")
    public void testDeletePlayerFromGame() {
        long userId = 1L;
        long gameId = 2L;
        Game mockGame = mockGameWithGroupMember(gameId, 0L, userId);
        long playerId = 3L;
        mockGame.setPlayers(new ArrayList<>(Collections.singletonList(mockUser(playerId))));
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));
        when(gameRepository.save(any(Game.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Game game = userGameService.deletePlayerFromGame(userId, gameId, playerId);

        assertTrue(game.getPlayers().isEmpty());
    }

    @Test
    @DisplayName("Should not delete any player from game if id is incorrect")
    public void testDeletePlayerFromGame_removeNotExistPlayer() {
        long userId = 1L;
        long gameId = 2L;
        Game mockGame = mockGameWithGroupMember(gameId, 0L, userId);
        long playerId = 3L;
        mockGame.setPlayers(new ArrayList<>(Collections.singletonList(mockUser(playerId))));
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));

        Game game = userGameService.deletePlayerFromGame(userId, gameId, playerId + 1);

        assertEquals(1, game.getPlayers().size());
    }

    @Test
    @DisplayName("Should generate balanced teams")
    public void testGenerateBalancedTeams() {
        long userId = 1L;
        long gameId = 2L;
        Game mockGame = mockGameWithGroupMember(gameId, 0L, userId);
        long playerId = 3L;
        List<User> players = Collections.singletonList(mockUser(playerId));
        mockGame.setPlayers(players);
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));
        when(teamBalancer.dividePlayersIntoBalancedTeams(argThat(config -> config.getPlayers().size() == 1 && config.getTeamsCount() == 1)))
                .thenReturn(Collections.singletonList(Team.of(Collections.singletonList(mockPlayer(playerId)))));
        BalancingConfig balancingConfig = BalancingConfig.builder().userId(userId).gameId(gameId).teamsCount(1).bots(null).build();

        List<Team> teams = userGameService.generateBalancedTeams(balancingConfig);

        assertEquals(1, teams.size());
        assertEquals(playerId, teams.get(0).getPlayers().get(0).getId());
        verify(gameRepository).save(mockGame);
    }

    @Test
    @DisplayName("Should generate balanced teams with bots")
    public void testGenerateBalancedTeams_withBots() {
        long userId = 1L;
        long gameId = 2L;
        Game mockGame = mockGameWithGroupMember(gameId, 0L, userId);
        long playerId = 3L;
        long botId = 4L;
        List<User> players = Collections.singletonList(mockUser(playerId));
        mockGame.setPlayers(players);
        Player player = mockPlayer(playerId);
        Player bot = mockPlayer(botId);
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));
        when(teamBalancer.dividePlayersIntoBalancedTeams(argThat(config -> config.getPlayers().size() == 2 && config.getTeamsCount() == 1)))
                .thenReturn(Collections.singletonList(Team.of(Arrays.asList(player, bot))));
        BalancingConfig balancingConfig = BalancingConfig.builder().userId(userId).gameId(gameId).teamsCount(1)
                .bots(Collections.singletonList(bot)).build();

        List<Team> teams = userGameService.generateBalancedTeams(balancingConfig);

        assertEquals(1, teams.size());
        assertEquals(playerId, teams.get(0).getPlayers().get(0).getId());
        assertEquals(botId, teams.get(0).getPlayers().get(1).getId());
    }

    @Test
    @DisplayName("Test generate balanced teams: Should throw exception if game wasn't found")
    public void testGenerateBalancedTeams_gameNotFound() {
        long userId = 1L;
        long gameId = 2L;
        BalancingConfig balancingConfig = BalancingConfig.builder().userId(userId).gameId(gameId).teamsCount(1).build();

        assertThrows(ResourceNotFoundException.class, () -> userGameService.generateBalancedTeams(balancingConfig));
    }

    @Test
    @DisplayName("Should regenerate balanced teams")
    public void testGenerateBalancedTeams_rebalancing() {
        long userId = 1L;
        long gameId = 2L;
        Game mockGame = mockGameWithGroupMember(gameId, 0L, userId);
        long playerId = 3L;
        List<User> players = Collections.singletonList(mockUser(playerId));
        mockGame.setPlayers(players);
        mockGame.setGameBalancing(createMockBalancing(mockGame));
        when(gameRepository.findById(gameId)).thenReturn(Optional.of(mockGame));
        when(randomTeamBalancer.dividePlayersIntoBalancedTeams(argThat(config -> config.getGameId().equals(gameId) &&
                config.getPlayers().size() == 1 && config.getTeamsCount() == 1)))
                .thenReturn(Collections.singletonList(Team.of(Collections.singletonList(mockPlayer(playerId)))));
        BalancingConfig balancingConfig = BalancingConfig.builder().userId(userId).gameId(gameId).teamsCount(1).bots(null).build();

        List<Team> teams = userGameService.generateBalancedTeams(balancingConfig);

        assertEquals(1, teams.size());
        assertEquals(playerId, teams.get(0).getPlayers().get(0).getId());
        verify(gameRepository).save(mockGame);
    }

    private static GameBalancing createMockBalancing(Game mockGame) {
        var gameBalancing = new GameBalancing();
        gameBalancing.setGame(mockGame);
        gameBalancing.setBalancedTeams(new BalancedTeams());
        return gameBalancing;
    }
}
