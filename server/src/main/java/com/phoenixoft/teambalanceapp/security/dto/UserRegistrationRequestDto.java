package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class UserRegistrationRequestDto {

    @NotBlank(message = "{user.blank.firstName}")
    private String firstName;

    @NotBlank(message = "{user.blank.lastName}")
    private String lastName;

    @NotBlank(message = "{user.blank.password}")
    private String password;

    @Email(message = "{email.invalid}")
    private String email;

    @NotBlank(message = "{user.blank.phone}")
    private String phone;

    @NotNull(message = "{user.null.rating}")
    private BigDecimal rating;

}
