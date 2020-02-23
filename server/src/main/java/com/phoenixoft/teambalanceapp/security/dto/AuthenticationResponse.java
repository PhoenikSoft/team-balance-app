package com.phoenixoft.teambalanceapp.security.dto;

import lombok.Builder;
import lombok.Value;

import java.io.Serializable;

@Value
@Builder
public class AuthenticationResponse implements Serializable {

    private String jwt;
    private AuthUserDetails userDetails;

}