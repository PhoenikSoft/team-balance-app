package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.rating.model.ResultRating;
import lombok.Data;

@Data
public class ResultRatingResponseDto {

    private int rating;

    public static ResultRatingResponseDto fromResultRating(ResultRating resultRating) {
        var response = new ResultRatingResponseDto();
        response.rating = resultRating.getRating();
        return response;
    }
}
