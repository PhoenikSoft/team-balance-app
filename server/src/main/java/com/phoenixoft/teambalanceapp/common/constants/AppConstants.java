package com.phoenixoft.teambalanceapp.common.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AppConstants {

    public static final int MAX_RATING = 100;
    public static final BigDecimal MAX_RATING_AS_BIG_DECIMAL = BigDecimal.valueOf(MAX_RATING);

    public static final int MAX_SURVEY_VALUE = 10;
}
