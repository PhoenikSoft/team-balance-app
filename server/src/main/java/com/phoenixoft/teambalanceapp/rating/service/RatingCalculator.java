package com.phoenixoft.teambalanceapp.rating.service;

import com.phoenixoft.teambalanceapp.rating.model.ResultRating;
import com.phoenixoft.teambalanceapp.rating.model.Survey;
import com.phoenixoft.teambalanceapp.rating.model.SurveyEntry;
import org.springframework.stereotype.Component;

import static com.phoenixoft.teambalanceapp.common.constants.AppConstants.MAX_RATING;

@Component
public class RatingCalculator {

    public ResultRating calculateRatingBySurvey(Survey survey) {
        int surveyTotalValue = survey.getSurveyEntries().stream().mapToInt(SurveyEntry::getSurveyValue).sum();
        int surveyMax = survey.getSurveyEntries().stream().mapToInt(SurveyEntry::getSurveyMaxValue).sum();
        int sumRating = surveyTotalValue * MAX_RATING / surveyMax;
        return ResultRating.of(sumRating);
    }
}
