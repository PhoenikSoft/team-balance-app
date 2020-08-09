package com.phoenixoft.teambalanceapp.vote.job;

import com.phoenixoft.teambalanceapp.common.exception.InvalidGameVotingStatusException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.game.entity.Game;
import com.phoenixoft.teambalanceapp.game.entity.VoteStatus;
import com.phoenixoft.teambalanceapp.game.repository.GameRepository;
import com.phoenixoft.teambalanceapp.properties.VotingProperties;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.vote.entity.UserVote;
import com.phoenixoft.teambalanceapp.vote.entity.UserVotesFilter;
import com.phoenixoft.teambalanceapp.vote.service.UserVoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class FinishGameVotingJob implements Job {

    public static final String GAME_ID_PARAM = "gameId";

    private final UserVoteService userVoteService;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final VotingProperties votingProperties;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        long gameId = context.getTrigger().getJobDataMap().getLong(GAME_ID_PARAM);
        log.info("FinishGameVotingJob: calculating votes for game[id={}]", gameId);

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found: " + gameId));
        if (game.getVoteStatus() != VoteStatus.STARTED) {
            throw new JobExecutionException(new InvalidGameVotingStatusException(
                    "Game vote status should be STARTED, but if was " + game.getVoteStatus()));
        }

        UserVotesFilter userVotesFilter = UserVotesFilter.builder().gameId(gameId).build();
        List<UserVote> gameVotes = userVoteService.getVotesByFilter(userVotesFilter);

        Map<User, List<UserVote>> votesByForUser = gameVotes.stream().collect(Collectors.groupingBy(UserVote::getForUser));
        votesByForUser.entrySet().forEach(this::evaluateNewRating);

        game.setVoteStatus(VoteStatus.FINISHED);
        gameRepository.save(game);
    }

    private void evaluateNewRating(Map.Entry<User, List<UserVote>> userWithVotes) {
        double averageVote = userWithVotes.getValue().stream().mapToInt(UserVote::getVote).average().getAsDouble();
        int averageVoteAsInt = (int) Math.round(averageVote);
        User user = userWithVotes.getKey();
        user.setPrevRating(user.getRating());
        user.setRating(defineNewRating(user, averageVoteAsInt));

        log.info("Changing rating for user[id={}] from {} to {}", user.getId(), user.getPrevRating(), user.getRating());
        userRepository.save(user);
    }

    private BigDecimal defineNewRating(User user, int averageVoteAsInt) {
        BigDecimal newRating = user.getPrevRating().add(new BigDecimal(averageVoteAsInt));
        if (newRating.compareTo(votingProperties.getMinRating()) < 0) {
            return votingProperties.getMinRating();
        }
        if (newRating.compareTo(votingProperties.getMaxRating()) > 0) {
            return votingProperties.getMaxRating();
        }
        return newRating;
    }
}
