package com.phoenixoft.teambalanceapp.user.service;

import com.phoenixoft.teambalanceapp.common.exception.EmailExistsException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.common.exception.ServiceException;
import com.phoenixoft.teambalanceapp.controller.dto.UserRequestDto;
import com.phoenixoft.teambalanceapp.security.PasswordTokenRepository;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.security.dto.PasswordResetToken;
import com.phoenixoft.teambalanceapp.security.dto.UpdatePasswordRequestDto;
import com.phoenixoft.teambalanceapp.security.dto.UserRegistrationRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.Role;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.util.SendGridMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User save(UserRequestDto dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setRating(dto.getRating());

        return userRepository.save(user);
    }

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
    }

    public User update(Long userId, UserRequestDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setRating(dto.getRating());
        return userRepository.save(user);
    }

    public void delete(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            for (Role role : user.getRoles()) {
                user.removeRole(role);
            }
            userRepository.delete(user);
        }
    }

    public User registerNewUser(UserRegistrationRequestDto dto) {
        if (emailExists(dto.getEmail())) {
            throw new EmailExistsException("There is an account with that email address: " + dto.getEmail());
        }
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setRating(dto.getRating());

        return userRepository.save(user);
    }

    private boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}
