package com.phoenixoft.teambalanceapp.security;

import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * TeamBalance user details service for getting user credentials.
 */
@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public CustomUser loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User by email is not found"));
        return new CustomUser(user.getId(), user.getEmail(), user.getPassword(), getAuthorities(user));
    }

    private Set<SimpleGrantedAuthority> getAuthorities(User user) {
        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
    }
}
