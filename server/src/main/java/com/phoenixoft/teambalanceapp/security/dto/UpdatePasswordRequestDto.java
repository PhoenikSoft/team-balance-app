package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdatePasswordRequestDto {

    @NotEmpty(message = "New password must not be empty.")
    private String newPassword;

    @NotEmpty(message = "Old password must not be empty.")
    private String oldPassword;
}
