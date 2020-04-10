package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.AddPlayersRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.BalancedTeamsResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.GameResponseDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.Team;
import com.phoenixoft.teambalanceapp.game.service.GameService;
import com.phoenixoft.teambalanceapp.group.service.GroupService;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.util.Converter;
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

    @GetMapping
    public List<GameResponseDto> getGroupGames(@PathVariable Long groupId) {
        List<Game> membersEntityList = groupService.getGroupGames(groupId);
        return membersEntityList.stream()
                .map(Converter::convertGame)
                .collect(Collectors.toList());
    }

    @PostMapping
    public GameResponseDto save(@PathVariable Long groupId, @Valid @RequestBody GameRequestDto dto,
                                Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        groupService.checkAdminPermissions(userDetails, groupId);
        Game entity = gameService.save(groupId, dto);
        return Converter.convertGame(entity);
    }

    @GetMapping(path = "/{gameId}")
    public GameResponseDto get(@PathVariable Long groupId, @PathVariable Long gameId) {
        Game entity = gameService.findGame(groupId, gameId);
        return Converter.convertGame(entity);
    }

    @PutMapping(path = "/{gameId}")
    public GameResponseDto update(@PathVariable Long groupId, @PathVariable Long gameId, @Valid @RequestBody GameRequestDto dto) {
        Game entity = gameService.updateGame(groupId, gameId, dto);
        return Converter.convertGame(entity);
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
                .map(Converter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> addPlayer(@PathVariable Long groupId, @PathVariable Long gameId, @PathVariable Long playerId) {
        Game entity = gameService.addPlayerToGame(groupId, gameId, playerId);
        return entity.getPlayers().stream()
                .map(Converter::convertUser)
                .collect(Collectors.toList());
    }

    @PostMapping(path = "/{gameId}/playersBatch")
    public List<UserResponseDto> addPlayers(@PathVariable Long groupId, @PathVariable Long gameId, @RequestBody AddPlayersRequestDto addPlayersRequestDto) {
        Game entity = gameService.addPlayersToGame(groupId, gameId, addPlayersRequestDto);
        return entity.getPlayers().stream()
                .map(Converter::convertUser)
                .collect(Collectors.toList());
    }

    @DeleteMapping(path = "/{gameId}/players/{playerId}")
    public List<UserResponseDto> deletePlayer(@PathVariable Long groupId, @PathVariable Long gameId, @PathVariable Long playerId) {
        Game entity = gameService.deletePlayerFromGame(groupId, gameId, playerId);
        return entity.getPlayers().stream()
                .map(Converter::convertUser)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{gameId}/balancedTeams")
    public BalancedTeamsResponseDto generateBalancedTeams(@PathVariable Long groupId, @PathVariable Long gameId) {
        List<Team> teams = gameService.generateBalancedTeams(groupId, gameId);
        return BalancedTeamsResponseDto.of(teams);
    }
}
