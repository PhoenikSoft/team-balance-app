package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class RestorePasswordRequestDto {

    @Email(message = "{email.invalid}")
    private String email;

}
