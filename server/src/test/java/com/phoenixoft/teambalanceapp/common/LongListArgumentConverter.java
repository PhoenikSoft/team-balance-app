package com.phoenixoft.teambalanceapp.common;

import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.params.converter.ArgumentConversionException;
import org.junit.jupiter.params.converter.ArgumentConverter;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

public class LongListArgumentConverter implements ArgumentConverter {

    @Override
    public Object convert(Object source, ParameterContext context) throws ArgumentConversionException {
        if (!(source instanceof String)) {
            throw new IllegalArgumentException("The argument should be a string: " + source);
        }

        String str = (String) source;
        if (str.isEmpty()) {
            return Collections.EMPTY_LIST;
        }
        return Arrays.stream(str.split(":")).map(Long::valueOf).collect(Collectors.toList());
    }
}
