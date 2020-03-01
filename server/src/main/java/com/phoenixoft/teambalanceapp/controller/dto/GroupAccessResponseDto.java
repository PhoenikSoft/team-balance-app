package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Value;

@Value(staticConstructor = "of")
public class GroupAccessResponseDto {

    private boolean canAccess;
}
