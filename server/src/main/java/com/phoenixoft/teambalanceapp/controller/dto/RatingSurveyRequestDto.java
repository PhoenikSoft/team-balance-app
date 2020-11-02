package com.phoenixoft.teambalanceapp.controller.dto;

import com.phoenixoft.teambalanceapp.rating.model.Survey;
import com.phoenixoft.teambalanceapp.rating.model.SurveyEntry;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class RatingSurveyRequestDto {

    @Valid
    @NotEmpty
    private List<SurveyEntryRequestDto> surveyEntries;

    public Survey toSurvey() {
        List<SurveyEntry> surveyEntries = this.surveyEntries.stream()
                .map(SurveyEntryRequestDto::toSurveyEntry)
                .collect(Collectors.toList());
        return Survey.of(surveyEntries);
    }
}
