package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;

@Data
public class FeedbackRequestDto {
    @NotBlank(message = "{feedback.blank.message}")
    private String message;
}
