package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class RestorePasswordRequestDto {

    @Email(message = "{email.invalid}")
    @NotEmpty
    private String email;
}
