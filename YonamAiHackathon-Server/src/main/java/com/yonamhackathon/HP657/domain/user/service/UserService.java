package com.yonamhackathon.HP657.domain.user.service;

import com.yonamhackathon.HP657.domain.user.dto.ResponseRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.entity.Role;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.global.exception.CustomException;
import com.yonamhackathon.HP657.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ResponseRegisterUserDto save(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_REGISTERED_EMAIL);
        }

        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User createdUser = userRepository.save(user);

        return ResponseRegisterUserDto.builder()
                .userId(createdUser.getUserId())
                .email(createdUser.getEmail())
                .build();
    }

}
