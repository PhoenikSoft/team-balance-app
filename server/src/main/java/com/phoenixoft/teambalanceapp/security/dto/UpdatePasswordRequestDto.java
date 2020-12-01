package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
public class UpdatePasswordRequestDto {

    @NotBlank(message = "{updatePassword.blank.newPassword}")
    @Length(min = 8)
    private String newPassword;

    @NotBlank(message = "{updatePassword.blank.securityToken}")
    private String securityToken;
}
