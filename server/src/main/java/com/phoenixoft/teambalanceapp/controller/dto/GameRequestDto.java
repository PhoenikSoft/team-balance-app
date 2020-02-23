package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.game.entity.Game;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
public class GameRequestDto {
    @NotBlank(message = "{game.blank.name}")
    private String name;
    private LocalDateTime startDateTime;

    public Game fillEntityWithDtoData(Game game) {
        game.setName(name);
        game.setStartDateTime(startDateTime);
        return game;
    }
}
