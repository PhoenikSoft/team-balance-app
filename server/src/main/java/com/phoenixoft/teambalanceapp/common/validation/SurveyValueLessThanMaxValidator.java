package com.phoenixoft.teambalanceapp.common.validation;

import com.phoenixoft.teambalanceapp.controller.dto.SurveyEntryRequestDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SurveyValueLessThanMaxValidator implements ConstraintValidator<SurveyValueLessThanMax, SurveyEntryRequestDto> {

    @Override
    public boolean isValid(SurveyEntryRequestDto value, ConstraintValidatorContext context) {
        return value.getSurveyValue() <= value.getSurveyMaxValue();
    }
}
