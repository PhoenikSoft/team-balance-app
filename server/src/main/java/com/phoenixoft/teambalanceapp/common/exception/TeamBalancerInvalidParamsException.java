package com.phoenixoft.teambalanceapp.common.exception;

import org.springframework.http.HttpStatus;

public class TeamBalancerInvalidParamsException extends ServiceException {

    public TeamBalancerInvalidParamsException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }

}
