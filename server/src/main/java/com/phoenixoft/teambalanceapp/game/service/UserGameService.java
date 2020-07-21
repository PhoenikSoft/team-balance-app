package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.BalancedTeams;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.UserGroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserGameService {

    private final GameRepository gameRepository;
    private final UserService userService;
    private final UserGroupService userGroupService;
    private final TeamBalancer teamBalancer;

    public Game save(Long userId, Long groupId, GameRequestDto dto) {
        Group group = userGroupService.findGroupById(userId, groupId);
        Game newGame = new Game();
        newGame.setName(dto.getName());
        newGame.setStartDateTime(dto.getStartDateTime());
        newGame.setGroup(group);
        return gameRepository.save(newGame);
    }

    public Game findGame(Long userId, Long gameId) {
        return userService.findById(userId).findGame(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
    }

    public Game updateGame(Long userId, Long gameId, GameRequestDto dto) {
        Game gameForUpdate = findGame(userId, gameId);
        gameForUpdate = dto.fillEntityWithDtoData(gameForUpdate);
        return gameRepository.save(gameForUpdate);
    }

    public void deleteGame(CustomUser user, Long gameId) {
        Game gameForDelete = findGame(user.getId(), gameId);
        userGroupService.checkAdminPermissions(user, gameForDelete.getGroup().getId());
        gameRepository.deleteById(gameForDelete.getId());
    }

    public List<User> getGamePlayers(Long userId, Long gameId) {
        return findGame(userId, gameId).getPlayers();
    }

    public Game addPlayerToGame(Long userId, Long gameId, Long memberToAddId) {
        Game game = findGame(userId, gameId);
        User newPlayer = game.getGroup().findMember(memberToAddId)
                .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + memberToAddId));
        game.getPlayers().add(newPlayer);
        return gameRepository.save(game);
    }

    public Game addPlayersToGame(Long userId, Long gameId, AddPlayersRequestDto addPlayersRequestDto) {
        Game game = findGame(userId, gameId);
        Group group = game.getGroup();
        for (Long playerId : addPlayersRequestDto.getPlayers()) {
            User newPlayer = group.findMember(playerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + playerId));
            game.getPlayers().add(newPlayer);
        }
        return gameRepository.save(game);
    }

    public Game deletePlayerFromGame(Long userId, Long gameId, Long playerId) {
        Game game = findGame(userId, gameId);
        if (game.removePlayer(playerId)) {
            game.setBalancedTeams(null);
            game = gameRepository.save(game);
        }
        return game;
    }

    public List<Team> generateBalancedTeams(Long userId, Long gameId, int teamsCount) {
        Game game = findGame(userId, gameId);
        List<Team> teams = game.getBalancedTeams() == null
                ? teamBalancer.dividePlayersIntoBalancedTeams(new ArrayList<>(game.getPlayers()), teamsCount)
                : teamBalancer.dividePlayersIntoBalancedTeamsWithSomeRandomness(new ArrayList<>(game.getPlayers()), teamsCount);

        game.setBalancedTeams(new BalancedTeams(teams));
        gameRepository.save(game);

        return teams;
    }
}
