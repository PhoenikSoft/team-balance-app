package com.phoenixoft.teambalanceapp.config;

import com.phoenixoft.teambalanceapp.vote.job.FinishGameVotingJob;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;

@Configuration
@RequiredArgsConstructor
public class QuartzConfig {

    public static final String FINISH_GAME_VOTING_TASK_NAME = "FinishGameVotingJob";
    public static final String VOTING_TASKS_GROUP = "Voting";

    @Bean
    JobDetailFactoryBean finishGameVotingTaskDetailFactory() {
        JobDetailFactoryBean jobDetailFactory = new JobDetailFactoryBean();
        jobDetailFactory.setName(FINISH_GAME_VOTING_TASK_NAME);
        jobDetailFactory.setGroup(VOTING_TASKS_GROUP);
        jobDetailFactory.setJobClass(FinishGameVotingJob.class);
        jobDetailFactory.setDescription("Finish game voting...");
        jobDetailFactory.setDurability(true);
        jobDetailFactory.setRequestsRecovery(true);
        return jobDetailFactory;
    }
}
