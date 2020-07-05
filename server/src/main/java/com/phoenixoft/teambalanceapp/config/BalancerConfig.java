package com.phoenixoft.teambalanceapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class BalancerConfig {

    @Bean
    Random random() {
        return new Random();
    }
}
