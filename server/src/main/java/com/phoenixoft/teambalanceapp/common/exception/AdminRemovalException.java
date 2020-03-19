package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class AdminRemovalException extends ServiceException {

    public AdminRemovalException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
