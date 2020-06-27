package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.AddGameVotesRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.BalancedTeamsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameUserVoteResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserGameVoteRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.service.GameService;
import com.phoenixoft.teambalanceapp.group.service.GroupService;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import com.phoenixoft.teambalanceapp.vote.entity.LightUserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/groups/{groupId}/games")
@AllArgsConstructor
public class GameController {

    private final GroupService groupService;
    private final GameService gameService;
    private final UserVoteService userVoteService;

    @GetMapping
    public List<GameResponseDto> getGroupGames(@PathVariable Long groupId) {
        List<Game> membersEntityList = groupService.getGroupGames(groupId);
        return membersEntityList.stream()
                .map(DtoConverter::convertGame)
                .collect(Collectors.toList());
    }

    @PostMapping
    public GameResponseDto saveGame(@PathVariable Long groupId, @Valid @RequestBody GameRequestDto dto,
                                    Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        Game entity = gameService.save(groupId, dto);
        return DtoConverter.convertGame(entity);
    }

    @GetMapping(path = "/{gameId}")
    public GameResponseDto getGame(@PathVariable Long groupId, @PathVariable Long gameId) {
        Game entity = gameService.findGameInGroup(groupId, gameId);
        return DtoConverter.convertGame(entity);
    }

    @PutMapping(path = "/{gameId}")
    public GameResponseDto updateGame(@PathVariable Long groupId, @PathVariable Long gameId, @Valid @RequestBody GameRequestDto dto) {
        Game entity = gameService.updateGame(groupId, gameId, dto);
        return DtoConverter.convertGame(entity);
    }

    @DeleteMapping(path = "/{gameId}")
    public void delete(@PathVariable Long groupId, @PathVariable Long gameId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        gameService.delete(groupId, gameId);
    }

    @GetMapping(path = "/{gameId}/players")
    public List<UserResponseDto> getPlayers(@PathVariable Long groupId, @PathVariable Long gameId) {
        List<User> players = gameService.getGamePlayers(groupId, gameId);
        return players.stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> addPlayer(@PathVariable Long groupId, @PathVariable Long gameId, @PathVariable Long playerId) {
        Game entity = gameService.addPlayerToGame(groupId, gameId, playerId);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/playersBatch")
    public List<UserResponseDto> addPlayers(@PathVariable Long groupId, @PathVariable Long gameId, @RequestBody AddPlayersRequestDto addPlayersRequestDto) {
        Game entity = gameService.addPlayersToGame(groupId, gameId, addPlayersRequestDto);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @DeleteMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> deletePlayer(@PathVariable Long groupId, @PathVariable Long gameId, @PathVariable Long playerId) {
        Game entity = gameService.deletePlayerFromGame(groupId, gameId, playerId);
        return entity.getPlayers().stream()
                .map(DtoConverter::convertUser)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{gameId}/balancedTeams")
    public BalancedTeamsResponseDto generateBalancedTeams(@PathVariable Long groupId, @PathVariable Long gameId) {
        List<Team> teams = gameService.generateBalancedTeams(groupId, gameId);
        return BalancedTeamsResponseDto.of(teams);
    }

    @GetMapping(path = "/{gameId}/votes")
    public List<GameUserVoteResponseDto> getMyVotes(@PathVariable Long gameId, Authentication authentication) {
        CustomUser userDetails = (CustomUser) authentication.getPrincipal();
        List<UserVote> gameVotes = gameService.getGameVotes(gameId, userDetails.getId());
        return gameVotes.stream().map(DtoConverter::convertGameUserVote).collect(Collectors.toList());
    }

    @PutMapping(path = "/{gameId}/votes")
    public void addVote(@PathVariable Long gameId, @Valid @RequestBody UserGameVoteRequestDto dto,
                        Authentication authentication) {
        userVoteService.saveVote(toLightUserVote(dto, gameId, authentication));
    }

    @PutMapping(path = "/{gameId}/votesBatches")
    public void addVotes(@PathVariable Long gameId, @Valid @RequestBody AddGameVotesRequestDto dtoList,
                         Authentication authentication) {
        List<LightUserVote> lightUserVotes = dtoList.getVotes().stream()
                .map(dto -> toLightUserVote(dto, gameId, authentication))
                .collect(Collectors.toList());
        userVoteService.saveVotes(lightUserVotes);
    }

    @PostMapping(path = "/{gameId}/votingStarts")
    public void startVoting(@PathVariable Long groupId, @PathVariable Long gameId, Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        gameService.startGameVoting(groupId, gameId);
    }

    private LightUserVote toLightUserVote(UserGameVoteRequestDto dto, Long gameId, Authentication authentication) {
        LightUserVote lightUserVote = new LightUserVote();
        lightUserVote.setForUserId(dto.getForUserId());
        lightUserVote.setVote(dto.getVote());
        lightUserVote.setGameId(gameId);
        CustomUser voter = (CustomUser) authentication.getPrincipal();
        lightUserVote.setVoterId(voter.getId());
        return lightUserVote;
    }
}
