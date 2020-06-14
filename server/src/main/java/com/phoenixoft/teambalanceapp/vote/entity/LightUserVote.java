package com.phoenixoft.teambalanceapp.vote.entity;

import lombok.Data;

@Data
public class LightUserVote {

    private Long forUserId;
    private Long voterId;
    private Long gameId;
    private Integer vote;
}
