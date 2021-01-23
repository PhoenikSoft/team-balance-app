package com.phoenixoft.teambalanceapp.config;

import com.phoenixoft.teambalanceapp.game.repository.GameBalancingRepository;
import com.phoenixoft.teambalanceapp.game.service.RandomizerTeamBalancer;
import com.phoenixoft.teambalanceapp.game.service.TeamBalancer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class BalancingConfig {

    @Bean
    Random random() {
        return new Random();
    }

    @Bean
    @Qualifier("bestRandomizedTeamBalancer")
    RandomizerTeamBalancer bestRandomizedTeamBalancer(@Qualifier("bestIntermediateAverageRatingTeamBalancer") TeamBalancer teamBalancer,
                                                      GameBalancingRepository gameBalancingRepository) {
        return new RandomizerTeamBalancer(teamBalancer, gameBalancingRepository, random());
    }
}
