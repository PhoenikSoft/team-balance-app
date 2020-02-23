package com.phoenixoft.teambalanceapp.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServiceException extends RuntimeException {

    private String message;

    private HttpStatus httpStatus;

    public ServiceException(String message, HttpStatus httpStatus, Throwable cause) {
        super(cause);
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public ServiceException(String message, HttpStatus httpStatus) {
        this(message, httpStatus, null);
    }
}
