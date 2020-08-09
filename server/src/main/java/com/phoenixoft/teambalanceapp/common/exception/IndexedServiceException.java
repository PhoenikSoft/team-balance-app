package com.phoenixoft.teambalanceapp.common.exception;

import lombok.Getter;

@Getter
public class IndexedServiceException extends ServiceException {

    private final int elemIndex;

    public IndexedServiceException(int elemIndex, ServiceException rootEx) {
        super(rootEx.getMessage(), rootEx.getHttpStatus());
        this.elemIndex = elemIndex;
    }

}
