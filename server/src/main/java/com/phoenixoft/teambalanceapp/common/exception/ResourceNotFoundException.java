package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ServiceException {
    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
