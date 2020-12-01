package com.phoenixoft.teambalanceapp.security;

import com.phoenixoft.teambalanceapp.security.dto.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordTokenRepository extends CrudRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);
}
