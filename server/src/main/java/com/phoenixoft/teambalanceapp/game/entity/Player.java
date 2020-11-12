package com.phoenixoft.teambalanceapp.game.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.phoenixoft.teambalanceapp.user.entity.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

import static com.phoenixoft.teambalanceapp.common.constants.AppConstants.MAX_RATING;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Player implements Serializable {

    @EqualsAndHashCode.Include
    private Long id;

    @NotBlank(message = "{user.blank.firstName}")
    @Size(max = 50)
    @EqualsAndHashCode.Include
    private String firstName;

    @NotBlank(message = "{user.blank.lastName}")
    @Size(max = 50)
    @EqualsAndHashCode.Include
    private String lastName;

    @NotNull(message = "{user.null.rating}")
    @Max(MAX_RATING)
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
