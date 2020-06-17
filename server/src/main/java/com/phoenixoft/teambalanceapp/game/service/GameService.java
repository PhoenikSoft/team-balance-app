package com.phoenixoft.teambalanceapp.game.service;

import com.phoenixoft.teambalanceapp.common.exception.InvalidGameVotingStatusException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.BalancedTeams;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.group.entity.Group;
import com.phoenixoft.teambalanceapp.group.service.GroupService;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVotesFilter;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final GroupService groupService;
    private final TeamBalancer teamBalancer;
    private final UserVoteService userVoteService;

    public Game save(Long groupId, GameRequestDto dto) {
        Group group = groupService.findById(groupId);
        Game newGame = new Game();
        newGame.setName(dto.getName());
        newGame.setStartDateTime(dto.getStartDateTime());
        newGame.setGroup(group);
        newGame.setVoteStatus(VoteStatus.NOT_STARTED);
        return gameRepository.save(newGame);
    }

    public Game findGameInGroup(Long groupId, Long gameId) {
        Group group = groupService.findById(groupId);
        return group.findGame(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
    }

    public Game updateGame(Long groupId, Long gameId, GameRequestDto dto) {
        Group group = groupService.findById(groupId);
        Game gameForUpdate = group.findGame(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
        gameForUpdate = dto.fillEntityWithDtoData(gameForUpdate);
        return gameRepository.save(gameForUpdate);
    }

    public void delete(Long groupId, Long gameId) {
        Group group = groupService.findById(groupId);
        Game gameForDelete = group.findGame(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
        group.removeGame(gameForDelete);
        gameRepository.deleteById(gameForDelete.getId());
    }

    public List<User> getGamePlayers(Long groupId, Long gameId) {
        return findGameInGroup(groupId, gameId).getPlayers();
    }

    public Game addPlayerToGame(Long groupId, Long gameId, Long userId) {
        Group group = groupService.findById(groupId);
        User newPlayer = group.findMember(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + userId));
        Game game = findGameInGroup(groupId, gameId);
        game.getPlayers().add(newPlayer);
        return gameRepository.save(game);
    }

    public Game addPlayersToGame(Long groupId, Long gameId, AddPlayersRequestDto addPlayersRequestDto) {
        Group group = groupService.findById(groupId);
        Game game = findGameInGroup(groupId, gameId);
        for (Long playerId : addPlayersRequestDto.getPlayers()) {
            User newPlayer = group.findMember(playerId)
                    .orElseThrow(() -> new ResourceNotFoundException("Group member not found: " + playerId));
            game.getPlayers().add(newPlayer);
        }
        return gameRepository.save(game);
    }

    public Game deletePlayerFromGame(Long groupId, Long gameId, Long userId) {
        Game game = findGameInGroup(groupId, gameId);
        if (game.removePlayer(userId)) {
            game.setBalancedTeams(null);
            game = gameRepository.save(game);
        }
        return game;
    }

    public List<Team> generateBalancedTeams(Long groupId, Long gameId) {
        Game game = findGameInGroup(groupId, gameId);
        List<Team> teams = teamBalancer.dividePlayersIntoBalancedTeams(new ArrayList<>(game.getPlayers()));

        game.setBalancedTeams(new BalancedTeams(teams));
        gameRepository.save(game);

        return teams;
    }

    public List<UserVote> getGameVotes(Long gameId, Long voterId) {
        return userVoteService.getVotesByFilter(UserVotesFilter.builder().gameId(gameId).voterId(voterId).build());
    }

    public void startGameVoting(Long groupId, Long gameId) {
        Game game = findGameInGroup(groupId, gameId);
        if (game.getVoteStatus() != VoteStatus.NOT_STARTED) {
            throw new InvalidGameVotingStatusException("Game voting has already started");
        }

        userVoteService.scheduleFinishVotingTask(gameId);

        game.setVoteStatus(VoteStatus.STARTED);
        gameRepository.save(game);
    }
}
