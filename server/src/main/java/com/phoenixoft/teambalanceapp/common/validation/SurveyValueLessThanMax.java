package com.phoenixoft.teambalanceapp.common.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SurveyValueLessThanMaxValidator.class)
public @interface SurveyValueLessThanMax {

    String message() default "{surveyEntry.valueLessThanMax}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
