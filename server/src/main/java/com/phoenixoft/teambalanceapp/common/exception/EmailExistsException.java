package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class EmailExistsException extends ServiceException {

    public EmailExistsException(String message) {
        super(message, HttpStatus.CONFLICT);
    }

}
