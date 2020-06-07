package com.phoenixoft.teambalanceapp.vote.service;

import com.phoenixoft.teambalanceapp.common.exception.GameVotingNotActiveException;
import com.phoenixoft.teambalanceapp.common.exception.PlayersAreNotInTheSameGameException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.common.exception.SelfVotingException;
import com.phoenixoft.teambalanceapp.common.exception.UserVoteExistsException;
import com.phoenixoft.teambalanceapp.controller.dto.UserVoteRequestDto;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.repository.UserVoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserVoteService {

    private final UserVoteRepository userVoteRepository;
    private final UserService userService;

    public void saveVote(UserVoteRequestDto userVoteRequest) {
        DbFetchedUserVoteFields dbFetchedUserVoteFields = validateSaveVoteRequest(userVoteRequest);

        UserVote userVote = new UserVote();
        userVote.setForUser(dbFetchedUserVoteFields.forUser);
        userVote.setVoter(dbFetchedUserVoteFields.voter);
        userVote.setGame(dbFetchedUserVoteFields.game);
        userVote.setVote(userVoteRequest.getVote().getValue());

        userVoteRepository.save(userVote);
    }

    private DbFetchedUserVoteFields validateSaveVoteRequest(UserVoteRequestDto userVoteRequest) {
        if (userVoteRequest.getForUserId().equals(userVoteRequest.getVoterId())) {
            throw new SelfVotingException("Voter id and forUser id cannot be the same. User cannot vote for himself");
        }

        User forUser = userService.findById(userVoteRequest.getForUserId());
        User voter = userService.findById(userVoteRequest.getVoterId());
        Game game = voter.findGame(userVoteRequest.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("User[id=%s] isn't assigned to a game[id=%s]",
                                voter.getId(), userVoteRequest.getGameId())));

        if (userVoteRepository.existsByForUserAndVoterAndGame(forUser, voter, game)) {
            throw new UserVoteExistsException("This vote is a duplicate and have already been sent");
        }

        if (game.getVoteStatus() != VoteStatus.STARTED) {
            throw new GameVotingNotActiveException("Voting hasn't started or has already finished for the game: " + game.getId());
        }

        // Voter was checked for game belonging earlier
        if (!game.hasPlayer(forUser.getId())) {
            throw new PlayersAreNotInTheSameGameException(String.format("Player[id=%s] and player[id=%s] are not in the same game",
                    forUser.getId(), voter.getId()));
        }

        return DbFetchedUserVoteFields.of(forUser, voter, game);
    }

    @Value(staticConstructor = "of")
    private static class DbFetchedUserVoteFields {
        User forUser;
        User voter;
        Game game;
    }
}
