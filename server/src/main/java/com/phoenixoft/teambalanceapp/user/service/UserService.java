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
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private PasswordTokenRepository passwordTokenRepository;

    private SendGridMailService mailService;

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

    public void updatePassword(UpdatePasswordRequestDto dto, CustomUser authenticatedUser){
        String email = authenticatedUser.getUsername();
        userRepository.findByEmail(email).ifPresent(user -> {
            if (passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
                userRepository.save(user);
            } else {
                throw new ServiceException("Wrong current password provided.", HttpStatus.BAD_REQUEST);
            }
        });
    }

    public void resetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        String token = UUID.randomUUID().toString();

        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now().plusHours(2));
        passwordTokenRepository.save(passwordResetToken);

        String mailContent = "To complete the password reset process, please click here: "
                + "http://localhost:5000/confirm-reset?token=" + token;
        // need to add path to the reset password page with generated token

        mailService.sendMail(mailContent, email);
    }

    public void validatePasswordToken(String token) {
        PasswordResetToken passwordResetToken = passwordTokenRepository.findByToken(token)
                .orElseThrow(() -> new ServiceException("Provided token is not valid.", HttpStatus.BAD_REQUEST));
        if (passwordResetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new ServiceException("Provided token was expired.", HttpStatus.BAD_REQUEST);
        }
        // add removing token from db
    }

}
