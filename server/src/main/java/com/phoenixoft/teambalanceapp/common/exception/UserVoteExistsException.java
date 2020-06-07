package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class UserVoteExistsException extends ServiceException {

    public UserVoteExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }

}
