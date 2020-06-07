package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class PlayersAreNotInTheSameGameException extends ServiceException {

    public PlayersAreNotInTheSameGameException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
