package com.phoenixoft.teambalanceapp.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@ConfigurationProperties(prefix = "voting")
@Component
@Data
public class VotingProperties {

    private long timeToVoteInSeconds;
    private BigDecimal minRating;
    private BigDecimal maxRating;
}
