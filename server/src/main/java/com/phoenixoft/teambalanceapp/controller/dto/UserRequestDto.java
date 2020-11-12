package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

import static com.phoenixoft.teambalanceapp.common.constants.AppConstants.MAX_RATING;

@Data
public class UserRequestDto {
    @NotBlank(message = "{user.blank.firstName}")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "{user.blank.lastName}")
    @Size(max = 50)
    private String lastName;

    @NotBlank(message = "{user.blank.phone}")
    @Pattern(regexp = "^\\+?\\d{12}$", message = "{user.phone.invalid}")
    private String phone;

    @NotNull(message = "{user.null.rating}")
    @Max(MAX_RATING)
    @Min(1)
    private BigDecimal rating;
}
