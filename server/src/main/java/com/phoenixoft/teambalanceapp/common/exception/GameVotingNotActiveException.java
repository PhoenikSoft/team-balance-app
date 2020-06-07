package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class GameVotingNotActiveException extends ServiceException {

    public GameVotingNotActiveException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
