package com.phoenixoft.teambalanceapp.vote.service;

import com.phoenixoft.teambalanceapp.common.exception.IndexedServiceException;
import com.phoenixoft.teambalanceapp.common.exception.InvalidGameVotingStatusException;
import com.phoenixoft.teambalanceapp.common.exception.PlayersAreNotInTheSameGameException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.common.exception.SelfVotingException;
import com.phoenixoft.teambalanceapp.common.exception.ServiceException;
import com.phoenixoft.teambalanceapp.config.QuartzConfig;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import com.phoenixoft.teambalanceapp.properties.VotingProperties;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.vote.entity.LightUserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVotesFilter;
import com.phoenixoft.teambalanceapp.vote.repository.UserVoteRepository;
import com.phoenixoft.teambalanceapp.vote.repository.spec.UserVoteForUserFieldSpecification;
import com.phoenixoft.teambalanceapp.vote.repository.spec.UserVoteGameFieldSpecification;
import com.phoenixoft.teambalanceapp.vote.repository.spec.UserVoteVoterFieldSpecification;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.Value;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.phoenixoft.teambalanceapp.vote.job.FinishGameVotingJob.GAME_ID_PARAM;

@Service
@RequiredArgsConstructor
public class UserVoteService {

    private final UserVoteRepository userVoteRepository;
    private final UserService userService;
    private final Scheduler scheduler;
    private final VotingProperties votingProperties;

    public void saveVote(LightUserVote userVoteRequest) {
        DbFetchedUserVoteFields dbFetchedUserVoteFields = validateSaveVoteRequest(userVoteRequest);
        userVoteRepository.save(createNewOrGetUserVoteWithNewVote(dbFetchedUserVoteFields, userVoteRequest));
    }

    public void saveVotes(List<LightUserVote> userVoteRequests) {
        List<UserVote> userVotes = new ArrayList<>(userVoteRequests.size());
        for (int i = 0; i < userVoteRequests.size(); i++) {
            LightUserVote userVoteRequest = userVoteRequests.get(i);
            DbFetchedUserVoteFields dbFetchedUserVoteFields;
            try {
                dbFetchedUserVoteFields = validateSaveVoteRequest(userVoteRequest);
            } catch (ServiceException ex) {
                throw new IndexedServiceException(i, ex);
            }

            userVotes.add(createNewOrGetUserVoteWithNewVote(dbFetchedUserVoteFields, userVoteRequest));
        }

        userVoteRepository.saveAll(userVotes);
    }

    public List<UserVote> getVotesByFilter(UserVotesFilter filter) {
        Specification<UserVote> userVotesSpecification = new UserVoteForUserFieldSpecification(filter)
                .and(new UserVoteVoterFieldSpecification(filter))
                .and(new UserVoteGameFieldSpecification(filter));
        return userVoteRepository.findAll(userVotesSpecification);
    }

    @SneakyThrows
    public void scheduleFinishVotingTask(Long gameId) {
        Instant startTimeOfTheTask = Instant.now(Clock.systemUTC())
                .plus(Duration.ofSeconds(votingProperties.getTimeToVoteInSeconds()));
        Trigger trigger = TriggerBuilder.newTrigger()
                .forJob(QuartzConfig.FINISH_GAME_VOTING_TASK_NAME, QuartzConfig.VOTING_TASKS_GROUP)
                .startAt(Date.from(startTimeOfTheTask))
                .usingJobData(GAME_ID_PARAM, gameId)
                .build();
        scheduler.scheduleJob(trigger);
    }

    private DbFetchedUserVoteFields validateSaveVoteRequest(LightUserVote userVoteRequest) {
        if (userVoteRequest.getForUserId().equals(userVoteRequest.getVoterId())) {
            throw new SelfVotingException("Voter id and forUser id cannot be the same. User cannot vote for himself");
        }

        User forUser = userService.findById(userVoteRequest.getForUserId());
        User voter = userService.findById(userVoteRequest.getVoterId());
        Game game = voter.findGame(userVoteRequest.getGameId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("User[id=%s] isn't assigned to a game[id=%s]",
                                voter.getId(), userVoteRequest.getGameId())));

        if (game.getVoteStatus() != VoteStatus.STARTED) {
            throw new InvalidGameVotingStatusException("Voting hasn't started or has already finished for the game: " + game.getId());
        }

        // Voter was checked for game belonging earlier
        if (!game.hasPlayer(forUser.getId())) {
            throw new PlayersAreNotInTheSameGameException(String.format("Player[id=%s] and player[id=%s] are not in the same game",
                    forUser.getId(), voter.getId()));
        }

        return DbFetchedUserVoteFields.of(forUser, voter, game);
    }

    private UserVote createNewOrGetUserVoteWithNewVote(DbFetchedUserVoteFields dbFetchedUserVoteFields, LightUserVote userVoteRequest) {
        UserVote userVote = userVoteRepository.getByForUserAndVoterAndGame(
                dbFetchedUserVoteFields.forUser, dbFetchedUserVoteFields.voter, dbFetchedUserVoteFields.game)
                .orElse(dbFetchedUserVoteFields.toUserVote());
        userVote.setVote(userVoteRequest.getVote());

        return userVote;
    }

    @Value(staticConstructor = "of")
    private static class DbFetchedUserVoteFields {
        User forUser;
        User voter;
        Game game;

        public UserVote toUserVote() {
            UserVote userVote = new UserVote();
            userVote.setForUser(forUser);
            userVote.setVoter(voter);
            userVote.setGame(game);

            return userVote;
        }
    }
}
