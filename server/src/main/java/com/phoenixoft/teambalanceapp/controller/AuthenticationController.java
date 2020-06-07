package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.security.AuthenticationService;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationRequest;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationResponse;
import com.phoenixoft.teambalanceapp.security.dto.RestorePasswordRequestDto;
import com.phoenixoft.teambalanceapp.security.dto.UserRegistrationRequestDto;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final UserService userService;

    @PostMapping(path = "/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.authenticateUser(authenticationRequest);
    }

    @PostMapping(path = "/register")
    public AuthenticationResponse registerNewUser(@RequestBody @Valid UserRegistrationRequestDto dto) {
        userService.registerNewUser(dto);
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(dto.getEmail(), dto.getPassword());
        return authenticationService.authenticateUser(authenticationRequest);
    }

    @PostMapping(path = "/reset-password")
    public void resetPassword(@RequestBody @Valid RestorePasswordRequestDto dto) {
        userService.resetPassword(dto.getEmail());
    }

    @GetMapping(path = "/confirm-reset")
    public void confirmResetPassword(@RequestParam String token) {
        userService.validatePasswordToken(token);
        // implement sending response if token is valid
    }

}
