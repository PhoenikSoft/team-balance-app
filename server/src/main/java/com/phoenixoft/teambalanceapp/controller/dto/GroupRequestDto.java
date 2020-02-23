package com.phoenixoft.teambalanceapp.controller.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class GroupRequestDto {
    @NotBlank(message = "{group.blank.name}")
    private String name;
}
