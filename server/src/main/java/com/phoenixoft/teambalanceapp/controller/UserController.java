package com.phoenixoft.teambalanceapp.controller;

import com.phoenixoft.teambalanceapp.controller.dto.UserRequestDto;
import com.phoenixoft.teambalanceapp.controller.dto.UserResponseDto;
import com.phoenixoft.teambalanceapp.security.dto.CustomUser;
import com.phoenixoft.teambalanceapp.security.dto.UpdatePasswordRequestDto;
import com.phoenixoft.teambalanceapp.user.entity.User;
import com.phoenixoft.teambalanceapp.user.service.UserService;
import com.phoenixoft.teambalanceapp.util.Converter;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping(consumes = "application/json")
    public UserResponseDto save(@Valid @RequestBody UserRequestDto dto) {
        User entity = userService.save(dto);
        return Converter.convertUser(entity);
    }

    @GetMapping(path = "/{userId}")
    public UserResponseDto get(@PathVariable Long userId) {
        User entity = userService.findById(userId);
        return Converter.convertUser(entity);
    }

    @PutMapping(path = "/{userId}")
    public UserResponseDto update(@Valid @RequestBody UserRequestDto dto, @PathVariable Long userId) {
        User entity = userService.update(userId, dto);
        return Converter.convertUser(entity);
    }

//    @DeleteMapping(path = "/{userId}")
    public void delete(@PathVariable Long userId) {
        userService.delete(userId);
    }

    @PostMapping(path = "/updatePassword")
    public void updatePassword(@RequestBody @Valid UpdatePasswordRequestDto dto,
                                            Authentication authentication) {
        CustomUser user = (CustomUser) authentication.getPrincipal();
        userService.updatePassword(dto, user);
    }

}
