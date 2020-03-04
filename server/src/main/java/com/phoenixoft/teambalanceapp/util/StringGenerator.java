package com.phoenixoft.teambalanceapp.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class StringGenerator {

    private final Random random = new Random();

    public String generateRandomStr(int length) {
        int leftLimit = 97; // letter 'a'
        int rightLimit = 122; // letter 'z'
        return random.ints(leftLimit, rightLimit + 1)
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}
