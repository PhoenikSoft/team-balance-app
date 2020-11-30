package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.UserRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.security.dto.UpdatePasswordRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.DtoConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/{userId}")
    public UserResponseDto getUser(@PathVariable Long userId) {
        User entity = userService.findById(userId);
        return DtoConverter.convertUser(entity);
    }

    @PutMapping(path = "/{userId}")
    public UserResponseDto updateUser(@RequestBody @Valid UserRequestDto dto, @PathVariable Long userId) {
        User entity = userService.update(userId, dto);
        return DtoConverter.convertUser(entity);
    }
}
