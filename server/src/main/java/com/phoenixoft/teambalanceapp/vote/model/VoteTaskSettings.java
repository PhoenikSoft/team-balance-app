package com.phoenixoft.teambalanceapp.vote.model;

import lombok.Value;

import java.time.Instant;

@Value(staticConstructor = "of")
public class VoteTaskSettings {
    Instant endTimeOfTheVoting;
}
