package com.phoenixoft.teambalanceapp.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleGenerator {

    private static final String ADMIN_ROLE_PREFIX = "ADMIN_ROLE_";
    private static final String USER_ROLE_PREFIX = "USER_ROLE_";

    public static String createAdminRole(Long id) {
        return ADMIN_ROLE_PREFIX + id;
    }

    public static String createUserRole(Long id) {
        return USER_ROLE_PREFIX + id;
    }
}
