package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class UserRegistrationRequestDto {

    @NotEmpty(message = "First name must not be empty.")
    private String firstName;

    @NotEmpty(message = "Last name must not be empty.")
    private String lastName;

    @NotEmpty(message = "Password must not be empty.")
    private String password;

    @Email(message = "Provided email is not correct.")
    private String email;

    @NotEmpty(message = "Phone must not be empty.")
    private String phone;

    @NotNull(message = "Rating must not be null.")
    private BigDecimal rating;

}
