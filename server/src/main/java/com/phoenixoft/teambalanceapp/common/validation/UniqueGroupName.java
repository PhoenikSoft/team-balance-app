package com.phoenixoft.teambalanceapp.common.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueGroupNameValidator.class)
public @interface UniqueGroupName {

    String message() default "{group.name.unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
