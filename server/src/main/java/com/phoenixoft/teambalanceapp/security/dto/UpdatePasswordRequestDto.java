package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UpdatePasswordRequestDto {

    @NotBlank(message = "{updatePassword.blank.newPassword}")
    private String newPassword;

    @NotBlank(message = "{updatePassword.blank.oldPassword}")
    private String oldPassword;
}
