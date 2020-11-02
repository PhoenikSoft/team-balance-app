package com.phoenixoft.teambalanceapp.rating.service;

import com.phoenixoft.teambalanceapp.rating.model.ResultRating;
import com.phoenixoft.teambalanceapp.rating.model.Survey;
import com.phoenixoft.teambalanceapp.rating.model.SurveyEntry;
import org.springframework.stereotype.Component;

@Component
public class RatingCalculator {

    public ResultRating calculateRatingBySurvey(Survey survey) {
        int sumRating = survey.getSurveyEntries().stream().mapToInt(SurveyEntry::getSurveyValue).sum();
        return ResultRating.of(sumRating * 4);
    }
}
