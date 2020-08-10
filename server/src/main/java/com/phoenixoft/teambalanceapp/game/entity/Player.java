package com.phoenixoft.teambalanceapp.game.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Player implements Serializable {

    private Long id;

    @NotBlank(message = "{user.blank.firstName}")
    @Size(max = 50)
    private String firstName;

    @NotBlank(message = "{user.blank.lastName}")
    @Size(max = 50)
    private String lastName;

    @NotNull(message = "{user.null.rating}")
    @Max(100)
    @Min(1)
    private BigDecimal rating;

    private boolean isBot;

    public static Player of(User user) {
        Player player = new Player();
        player.id = user.getId();
        player.firstName = user.getFirstName();
        player.lastName = user.getLastName();
        player.rating = user.getRating();
        return player;
    }
}
