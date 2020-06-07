package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class CustomExpiredJwtException extends ServiceException {

    public CustomExpiredJwtException(String message) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
