package com.phoenixoft.teambalanceapp.user.service;

import com.phoenixoft.teambalanceapp.common.exception.ResourceNotFoundException;
import com.phoenixoft.teambalanceapp.controller.dto.UserRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    public void save() {
        UserRequestDto dto = new UserRequestDto();
        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setPhone("+387");
        dto.setRating(new BigDecimal(7));

        User expectedUser = new User();
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        User user = userService.save(dto);
        Assertions.assertEquals(expectedUser, user);
    }

    @Test
    public void findById() {
        Long userId = 25L;

        Optional<User> expectedUser = Optional.of(new User());
        when(userRepository.findById(userId)).thenReturn(expectedUser);

        User user = userService.findById(userId);
        Assertions.assertEquals(expectedUser.get(), user);
    }

    @Test
    public void findByIdWhenNotFound() {
        Long userId = 25L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.findById(userId));
    }

    @Test
    public void update() {
        Long userId = 25L;
        UserRequestDto dto = new UserRequestDto();
        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setPhone("+387");
        dto.setRating(new BigDecimal(7));

        Optional<User> expectedUser = Optional.of(new User());
        when(userRepository.findById(userId)).thenReturn(expectedUser);
        when(userRepository.save(expectedUser.get())).thenReturn(expectedUser.get());

        User user = userService.update(userId, dto);
        Assertions.assertEquals(dto.getFirstName(), user.getFirstName());
        Assertions.assertEquals(dto.getLastName(), user.getLastName());
        Assertions.assertEquals(dto.getPhone(), user.getPhone());
        Assertions.assertEquals(dto.getRating(), user.getRating());
    }

    @Test
    public void updateWhenNotFound() {
        Long userId = 25L;
        UserRequestDto dto = new UserRequestDto();

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.update(userId, dto));
    }

    @Test
    public void delete() {
        Long userId = 25L;

        Optional<User> expectedUser = Optional.of(new User());
        when(userRepository.findById(userId)).thenReturn(expectedUser);

        userService.delete(userId);

        verify(userRepository).delete(expectedUser.get());
    }

    @Test
    public void deleteWhenNotFound() {
        Long userId = 25L;

        Optional<User> expectedUser = Optional.empty();
        when(userRepository.findById(userId)).thenReturn(expectedUser);

        userService.delete(userId);

        verify(userRepository, times(0)).delete(any());
    }
}
