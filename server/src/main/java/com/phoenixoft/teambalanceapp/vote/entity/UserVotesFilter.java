package com.phoenixoft.teambalanceapp.vote.entity;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserVotesFilter {

    Long forUserId;
    Long voterId;
    Long gameId;
}
