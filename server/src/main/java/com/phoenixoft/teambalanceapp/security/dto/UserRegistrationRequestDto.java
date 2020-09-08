package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Data;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class UserRegistrationRequestDto {

    @NotBlank(message = "{user.blank.firstName}")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "{user.blank.lastName}")
    @Size(max = 50)
    private String lastName;

    @NotBlank(message = "{user.blank.password}")
    private String password;

    @Email(message = "{email.invalid}")
    @NotBlank(message = "{user.blank.email}")
    @Size(max = 50)
    private String email;

    @NotBlank(message = "{user.blank.phone}")
    @Pattern(regexp = "^\\d{1,9}$", message = "{user.phone.invalid}")
    private String phone;

    @NotNull(message = "{user.null.rating}")
    @Max(100)
    @Min(1)
    private BigDecimal rating;

}
