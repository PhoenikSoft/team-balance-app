package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class InvalidGameVotingStatusException extends ServiceException {

    public InvalidGameVotingStatusException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
