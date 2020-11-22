package com.phoenixoft.teambalanceapp.user.service;

import com.phoenixoft.teambalanceapp.common.exception.ExpiredTokenException;
import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.properties.ForgotPasswordProperties;
import com.phoenixoft.teambalanceapp.security.PasswordTokenRepository;
import com.phoenixoft.teambalanceapp.security.dto.PasswordResetToken;
import com.phoenixoft.teambalanceapp.security.dto.UpdatePasswordRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import com.phoenixoft.teambalanceapp.util.SendGridMailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ForgetPasswordService {

    private static final String RESET_PASSWORD_EMAIL_CONTENT = "To complete the password reset process, please click here: %s?token=%s";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordTokenRepository passwordTokenRepository;
    private final SendGridMailService mailService;
    private final ForgotPasswordProperties forgotPasswordProperties;

    public void requestResetPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
        String token = saveForgotPasswordRequest(user);
        String mailContent = String.format(RESET_PASSWORD_EMAIL_CONTENT, forgotPasswordProperties.getUrl(), token);
        mailService.sendMail(mailContent, email);
    }

    private String saveForgotPasswordRequest(User user) {
        var passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(UUID.randomUUID().toString());
        passwordResetToken.setUser(user);
        passwordResetToken.setExpiryDate(LocalDateTime.now(ZoneOffset.UTC).plusHours(1));
        return passwordTokenRepository.save(passwordResetToken).getToken();
    }

    public void updatePassword(UpdatePasswordRequestDto dto) {
        String securityToken = dto.getSecurityToken();
        PasswordResetToken passwordResetToken = passwordTokenRepository.findByToken(securityToken)
                .orElseThrow(() -> new ResourceNotFoundException("Token is invalid: " + securityToken));
        if (isTokenExpired(passwordResetToken)) {
            removeResetToken(passwordResetToken);
            throw new ExpiredTokenException("Token is expired: " + securityToken);
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
        removeResetToken(passwordResetToken);
    }

    private void removeResetToken(PasswordResetToken passwordResetToken) {
        passwordTokenRepository.delete(passwordResetToken);
    }

    private boolean isTokenExpired(PasswordResetToken passToken) {
        return passToken.getExpiryDate().isBefore(LocalDateTime.now(ZoneOffset.UTC));
    }
}
