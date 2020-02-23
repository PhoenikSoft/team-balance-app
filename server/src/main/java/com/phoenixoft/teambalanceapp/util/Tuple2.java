package com.phoenixoft.teambalanceapp.util;

import lombok.Value;

@Value(staticConstructor = "of")
public class Tuple2<L, R> {
    L left;
    R right;
}
