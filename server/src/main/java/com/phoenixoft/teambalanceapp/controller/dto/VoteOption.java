package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum VoteOption {
    INCREASE(5), OMIT(0), DECREASE(-5);

    private final int value;
}
