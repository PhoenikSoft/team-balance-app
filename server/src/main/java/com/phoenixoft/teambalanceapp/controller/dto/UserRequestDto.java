package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.math.BigDecimal;

@Data
public class UserRequestDto {
    @NotBlank(message = "{user.blank.firstName}")
    private String firstName;
    @NotEmpty(message = "{user.blank.lastName}")
    private String lastName;
    @NotBlank(message = "{user.blank.phone}")
    private String phone;
    private BigDecimal rating;
}
