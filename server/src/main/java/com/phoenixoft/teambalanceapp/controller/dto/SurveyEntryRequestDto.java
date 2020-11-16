package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.common.validation.SurveyValueLessThanMax;
import com.phoenixoft.teambalanceapp.rating.model.SurveyEntry;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import static com.phoenixoft.teambalanceapp.common.constants.AppConstants.MAX_SURVEY_VALUE;

@Data
@SurveyValueLessThanMax
public class SurveyEntryRequestDto {

    @Min(0)
    @Max(MAX_SURVEY_VALUE)
    private byte surveyValue;

    @Min(1)
    @Max(MAX_SURVEY_VALUE)
    private byte surveyMaxValue;

    public SurveyEntry toSurveyEntry() {
        return SurveyEntry.of(surveyValue, surveyMaxValue);
    }
}
