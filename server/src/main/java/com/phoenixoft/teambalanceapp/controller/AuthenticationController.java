package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.security.AuthenticationService;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationRequest;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationResponse;
import com.phoenixoft.teambalanceapp.security.dto.RestorePasswordRequestDto;
import com.phoenixoft.teambalanceapp.security.dto.UpdatePasswordRequestDto;
import com.phoenixoft.teambalanceapp.security.dto.UserRegistrationRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.ForgetPasswordService;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final ForgetPasswordService forgetPasswordService;

    @PostMapping(path = "/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.authenticateUser(authenticationRequest);
    }

    @PostMapping(path = "/register")
    public AuthenticationResponse registerNewUser(@RequestBody @Valid UserRegistrationRequestDto dto) {
        User user = userService.registerNewUser(dto);
        return authenticationService.authenticateUserAfterRegistration(user);
    }

    @PostMapping(path = "/init-reset-password")
    public void initResetPassword(@RequestBody @Valid RestorePasswordRequestDto dto) {
        forgetPasswordService.requestResetPassword(dto.getEmail());
    }

    @PostMapping(path = "/confirm-reset-password")
    public void updatePassword(@RequestBody @Valid UpdatePasswordRequestDto dto) {
        forgetPasswordService.updatePassword(dto);
    }
}
