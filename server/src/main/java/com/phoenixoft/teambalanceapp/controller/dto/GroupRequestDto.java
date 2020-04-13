package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.common.validation.UniqueGroupName;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class GroupRequestDto {
    @NotBlank(message = "{group.blank.name}")
    @UniqueGroupName
    private String name;
}
