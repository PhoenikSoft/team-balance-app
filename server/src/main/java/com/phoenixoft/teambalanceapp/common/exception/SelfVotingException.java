package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class SelfVotingException extends ServiceException {

    public SelfVotingException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
