package com.phoenixoft.teambalanceapp.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AppUtils {

    public static <T> List<List<T>> generateAllCombinations(List<T> list) {
        return getAllCombinations(new ArrayList<>(), list);
    }

    public static <T> List<T> removeElem(List<T> list, T elem) {
        List<T> newList = new ArrayList<>(list);
        newList.remove(elem);
        return newList;
    }

    public static <T> List<T> addElem(List<T> list, T elem) {
        List<T> newList = new ArrayList<>(list);
        newList.add(elem);
        return newList;
    }

    public static <T> List<T> concat(List<T> list1, List<T> list2) {
        return Stream.concat(list1.stream(), list2.stream()).collect(Collectors.toList());
    }

    public static <K, V> Map<K, V> concat(Map<K, V> map1, Map<K, V> map2) {
        return Stream.concat(map1.entrySet().stream(), map2.entrySet().stream())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    private static <T> List<List<T>> getAllCombinations(List<T> leftList, List<T> rightList) {
        if (rightList.isEmpty()) {
            return Collections.singletonList(leftList);
        }

        Stream<T> rightStream = rightList.size() > 10 ? rightList.parallelStream() : rightList.stream();
        return rightStream
                .flatMap(elem -> getAllCombinations(addElem(leftList, elem), removeElem(rightList, elem)).stream())
                .collect(Collectors.toList());
    }
}
