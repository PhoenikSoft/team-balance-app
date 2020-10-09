package com.phoenixoft.teambalanceapp.config;

import com.phoenixoft.teambalanceapp.vote.job.FinishGameVotingJob;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseDataSource;
import org.springframework.boot.autoconfigure.quartz.QuartzDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;

import javax.sql.DataSource;

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

    @Bean
    @Primary
    @LiquibaseDataSource
    @ConfigurationProperties("spring.datasource")
    DataSource springDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @QuartzDataSource
    @ConfigurationProperties("quartz.datasource")
    DataSource quartzDataSource() {
        return DataSourceBuilder.create().build();
    }
}
