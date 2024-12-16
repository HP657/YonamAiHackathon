package com.yonamhackathon.HP657.domain.user.service;

import com.yonamhackathon.HP657.domain.user.dto.ResponseGpaDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.entity.Gpa;
import com.yonamhackathon.HP657.domain.user.entity.Role;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.GpaRepository;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.global.exception.CustomException;
import com.yonamhackathon.HP657.global.exception.ErrorCode;
import com.yonamhackathon.HP657.global.utility.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final GpaRepository gpaRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseRegisterUserDto save(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new CustomException(ErrorCode.ALREADY_REGISTERED_EMAIL);
        }

        user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User createdUser = userRepository.save(user);

        Gpa userGpa = new Gpa();
        userGpa.setEmail(createdUser.getEmail());
        userGpa.setGpa(3.5);
        userGpa.setCount(1);
        gpaRepository.save(userGpa);

        return ResponseRegisterUserDto.builder()
                .userId(createdUser.getUserId())
                .email(createdUser.getEmail())
                .build();
    }

    public ResponseGpaDto getUserGpa(String token) {
        String userEmail = jwtUtil.extractEmail(token);

        Optional<Gpa> optionalGpa = gpaRepository.findByEmail(userEmail);

        if (optionalGpa.isPresent()) {
            Gpa gpa = optionalGpa.get();
            ResponseGpaDto responseGpaDto = new ResponseGpaDto();
            responseGpaDto.setGpa(gpa.getGpa());
            responseGpaDto.setCount(gpa.getCount());
            return responseGpaDto;
        } else {
            throw new RuntimeException("GPA not found for user: " + userEmail);
        }
    }


}
