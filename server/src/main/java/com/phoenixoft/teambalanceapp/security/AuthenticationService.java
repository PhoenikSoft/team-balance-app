package com.phoenixoft.teambalanceapp.security;

import com.phoenixoft.teambalanceapp.common.exception.CredentialsFailedException;
import com.phoenixoft.teambalanceapp.security.dto.AuthUserDetails;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationRequest;
import com.phoenixoft.teambalanceapp.security.dto.AuthenticationResponse;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public AuthenticationResponse authenticateUser(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new CredentialsFailedException("Incorrect email or password");
        }

        CustomUser userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User by email is not found"));
        return AuthenticationResponse.builder()
                .userDetails(AuthUserDetails.of(user))
                .jwt(jwtTokenUtil.generateToken(user))
                .build();
    }

    public AuthenticationResponse authenticateUserAfterRegistration(User user) {
        return AuthenticationResponse.builder()
                .userDetails(AuthUserDetails.of(user))
                .jwt(jwtTokenUtil.generateToken(user))
                .build();

    }

}
