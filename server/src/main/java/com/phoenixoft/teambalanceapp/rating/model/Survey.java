package com.phoenixoft.teambalanceapp.rating.model;

import lombok.Value;

import java.util.List;

@Value(staticConstructor = "of")
public class Survey {

    List<SurveyEntry> surveyEntries;
}
