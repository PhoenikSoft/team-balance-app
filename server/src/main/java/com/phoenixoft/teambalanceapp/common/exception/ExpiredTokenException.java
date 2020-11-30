package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class ExpiredTokenException extends ServiceException {

    public ExpiredTokenException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
