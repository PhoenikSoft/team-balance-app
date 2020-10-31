package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.AddGameVotesRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.BalancedTeamsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.BalancingBots;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameUserVoteResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameViewResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameVotingStartedResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserGameVoteRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Player;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.model.BalancingConfig;
import com.phoenixoft.teambalanceapp.game.service.UserGameService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import com.phoenixoft.teambalanceapp.vote.entity.LightUserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/userGames")
@AllArgsConstructor
public class UserGameController {

    private final UserGameService userGameService;
    private final UserVoteService userVoteService;

    @GetMapping(path = "/{gameId}")
    public GameResponseDto getGame(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        Game entity = userGameService.findUserGame(currentCustomUser.getId(), gameId);
        return DtoConverter.convertGame(entity);
    }

    @GetMapping(path = "/{gameId}/views")
    public GameViewResponseDto getGameView(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        Game game = userGameService.findUserGame(currentCustomUser.getId(), gameId);
        List<UserVote> gameVotes = userGameService.getGameVotes(gameId, currentCustomUser.getId());
        return DtoConverter.convertGameView(game, gameVotes);
    }

    @PutMapping(path = "/{gameId}")
    public GameResponseDto updateGame(@PathVariable Long gameId, @Valid @RequestBody GameRequestDto dto,
                                      @RequestAttribute CustomUser currentCustomUser) {
        Game entity = userGameService.updateGame(currentCustomUser.getId(), gameId, dto);
        return DtoConverter.convertGame(entity);
    }

    @DeleteMapping(path = "/{gameId}")
    public void delete(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        userGameService.deleteGame(currentCustomUser, gameId);
    }

    @GetMapping(path = "/{gameId}/players")
    public List<UserResponseDto> getPlayers(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        List<User> players = userGameService.getGamePlayers(currentCustomUser.getId(), gameId);
        return players.stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> addPlayer(@PathVariable Long gameId, @PathVariable Long playerId,
                                           @RequestAttribute CustomUser currentCustomUser) {
        Game entity = userGameService.addPlayerToGame(currentCustomUser.getId(), gameId, playerId);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/playersBatch")
    public List<UserResponseDto> addPlayers(@PathVariable Long gameId, @RequestBody AddPlayersRequestDto addPlayersRequestDto,
                                            @RequestAttribute CustomUser currentCustomUser) {
        Game entity = userGameService.addPlayersToGame(currentCustomUser.getId(), gameId, addPlayersRequestDto);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @DeleteMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> deletePlayer(@PathVariable Long gameId, @PathVariable Long playerId,
                                              @RequestAttribute CustomUser currentCustomUser) {
        Game entity = userGameService.deletePlayerFromGame(currentCustomUser.getId(), gameId, playerId);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PutMapping(path = "/{gameId}/balancedTeams")
    public BalancedTeamsResponseDto generateBalancedTeams(@PathVariable Long gameId,
                                                          @RequestParam(defaultValue = "2") Integer teamsCount,
                                                          @RequestBody(required = false) @Valid BalancingBots bots,
                                                          @RequestAttribute CustomUser currentCustomUser) {
        List<Player> botsList = Optional.ofNullable(bots).map(BalancingBots::getBots).orElse(null);
        BalancingConfig balancingConfig = BalancingConfig.builder().userId(currentCustomUser.getId()).gameId(gameId)
                .teamsCount(teamsCount).bots(botsList).build();
        List<Team> teams = userGameService.generateBalancedTeams(balancingConfig);
        return BalancedTeamsResponseDto.of(teams);
    }

    @GetMapping(path = "/{gameId}/votes")
    public List<GameUserVoteResponseDto> getMyVotes(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        List<UserVote> gameVotes = userGameService.getGameVotes(gameId, currentCustomUser.getId());
        return gameVotes.stream().map(DtoConverter::convertGameUserVote).collect(Collectors.toList());
    }

    @PutMapping(path = "/{gameId}/votes")
    public void addVote(@PathVariable Long gameId, @Valid @RequestBody UserGameVoteRequestDto dto,
                        @RequestAttribute CustomUser currentCustomUser) {
        userVoteService.saveVote(toLightUserVote(dto, gameId, currentCustomUser));
    }

    @PutMapping(path = "/{gameId}/votesBatches")
    public void addVotes(@PathVariable Long gameId, @Valid @RequestBody AddGameVotesRequestDto dtoList,
                         @RequestAttribute CustomUser currentCustomUser) {
        List<LightUserVote> lightUserVotes = dtoList.getVotes().stream()
                .map(dto -> toLightUserVote(dto, gameId, currentCustomUser))
                .collect(Collectors.toList());
        userVoteService.saveVotes(lightUserVotes);
    }

    @PostMapping(path = "/{gameId}/votingStarts")
    public GameVotingStartedResponseDto startVoting(@PathVariable Long gameId, @RequestAttribute CustomUser currentCustomUser) {
        Game game = userGameService.startGameVoting(currentCustomUser, gameId);
        return DtoConverter.convertGameVotingStartedResponse(game);
    }

    private LightUserVote toLightUserVote(UserGameVoteRequestDto dto, Long gameId, CustomUser currentUser) {
        LightUserVote lightUserVote = new LightUserVote();
        lightUserVote.setForUserId(dto.getForUserId());
        lightUserVote.setVote(dto.getVote());
        lightUserVote.setGameId(gameId);
        lightUserVote.setVoterId(currentUser.getId());
        return lightUserVote;
    }
}
