package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.RatingSurveyRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.ResultRatingResponseDto;
import com.phoenixoft.teambalanceapp.rating.model.ResultRating;
import com.phoenixoft.teambalanceapp.rating.service.RatingCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingCalculator ratingCalculator;

    @PutMapping
    public ResultRatingResponseDto save(@RequestBody @Valid RatingSurveyRequestDto ratingSurveyRequestDto) {
        ResultRating resultRating = ratingCalculator.calculateRatingBySurvey(ratingSurveyRequestDto.toSurvey());
        return ResultRatingResponseDto.fromResultRating(resultRating);
    }
}
