package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.exception.InvalidGameVotingStatusException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.BalancedTeams;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import com.phoenixoft.teambalanceapp.game.model.BalancingConfig;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.UserGroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVotesFilter;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserGameService {

    private final GameRepository gameRepository;
    private final UserGroupService userGroupService;
    private final TeamBalancer teamBalancer;
    private final UserVoteService userVoteService;

    public Game save(Long userId, Long groupId, GameRequestDto dto) {
        Group group = userGroupService.findGroupById(userId, groupId);
        Game newGame = new Game();
        newGame.setName(dto.getName());
        newGame.setStartDateTime(dto.getStartDateTime());
        newGame.setGroup(group);
        newGame.setVoteStatus(VoteStatus.NOT_STARTED);
        return gameRepository.save(newGame);
    }

    public Game findUserGame(Long userId, Long gameId) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
        game.getGroup().findMember(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
        return game;
    }

    public Game updateGame(Long userId, Long gameId, GameRequestDto dto) {
        Game gameForUpdate = findUserGame(userId, gameId);
        gameForUpdate = dto.fillEntityWithDtoData(gameForUpdate);
        return gameRepository.save(gameForUpdate);
    }

    public void deleteGame(CustomUser user, Long gameId) {
        Game gameForDelete = findUserGame(user.getId(), gameId);
        userGroupService.checkAdminPermissions(user, gameForDelete.getGroup().getId());
        gameRepository.deleteById(gameForDelete.getId());
    }

    public List<User> getGamePlayers(Long userId, Long gameId) {
        return findUserGame(userId, gameId).getPlayers();
    }

    public Game addPlayerToGame(Long userId, Long gameId, Long memberToAddId) {
        Game game = findUserGame(userId, gameId);
        User newPlayer = game.getGroup().findMember(memberToAddId)
                .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + memberToAddId));
        game.getPlayers().add(newPlayer);
        return gameRepository.save(game);
    }

    public Game addPlayersToGame(Long userId, Long gameId, AddPlayersRequestDto addPlayersRequestDto) {
        Game game = findUserGame(userId, gameId);
        Group group = game.getGroup();
        for (Long playerId : addPlayersRequestDto.getPlayers()) {
            User newPlayer = group.findMember(playerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + playerId));
            game.getPlayers().add(newPlayer);
        }
        return gameRepository.save(game);
    }

    public Game deletePlayerFromGame(Long userId, Long gameId, Long playerId) {
        Game game = findUserGame(userId, gameId);
        if (game.removePlayer(playerId)) {
            game.setBalancedTeams(null);
            game = gameRepository.save(game);
        }
        return game;
    }

    public List<Team> generateBalancedTeams(BalancingConfig balancingConfig) {
        Game game = findUserGame(balancingConfig.getUserId(), balancingConfig.getGameId());
        List<Player> allPlayers = new ArrayList<>(balancingConfig.getBots());
        List<Player> realPlayers = game.getPlayers().stream().map(Player::of).collect(Collectors.toList());
        allPlayers.addAll(realPlayers);
        List<Team> teams = game.getBalancedTeams() == null
                ? teamBalancer.dividePlayersIntoBalancedTeams(allPlayers, balancingConfig.getTeamsCount())
                : teamBalancer.dividePlayersIntoBalancedTeamsWithSomeRandomness(allPlayers, balancingConfig.getTeamsCount());

        game.setBalancedTeams(new BalancedTeams(teams));
        gameRepository.save(game);

        return teams;
    }

    public List<UserVote> getGameVotes(Long gameId, Long voterId) {
        return userVoteService.getVotesByFilter(UserVotesFilter.builder().gameId(gameId).voterId(voterId).build());
    }

    public void startGameVoting(CustomUser user, Long gameId) {
        Game game = findUserGame(user.getId(), gameId);
        userGroupService.checkAdminPermissions(user, game.getGroup().getId());
        if (game.getVoteStatus() != VoteStatus.NOT_STARTED) {
            throw new InvalidGameVotingStatusException("Game voting has already started");
        }

        userVoteService.scheduleFinishVotingTask(gameId);

        game.setVoteStatus(VoteStatus.STARTED);
        gameRepository.save(game);
    }
}
