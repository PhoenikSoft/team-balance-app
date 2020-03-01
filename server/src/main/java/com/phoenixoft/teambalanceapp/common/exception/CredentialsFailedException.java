package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class CredentialsFailedException extends ServiceException {

    public CredentialsFailedException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
