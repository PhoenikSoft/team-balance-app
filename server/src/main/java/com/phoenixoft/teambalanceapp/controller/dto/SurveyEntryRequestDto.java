package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.rating.model.SurveyEntry;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class SurveyEntryRequestDto {
    @Min(1)
    @Max(10)
    private byte surveyValue;

    public SurveyEntry toSurveyEntry() {
        return SurveyEntry.of(surveyValue);
    }
}
