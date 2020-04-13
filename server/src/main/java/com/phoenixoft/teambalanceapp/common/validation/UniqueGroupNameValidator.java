package com.phoenixoft.teambalanceapp.common.validation;

import com.phoenixoft.teambalanceapp.group.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueGroupNameValidator implements ConstraintValidator<UniqueGroupName, String> {

    @Autowired
    private GroupRepository groupRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !groupRepository.existsByName(value);
    }
}
