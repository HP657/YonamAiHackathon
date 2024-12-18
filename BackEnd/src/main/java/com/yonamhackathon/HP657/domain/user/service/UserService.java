package com.yonamhackathon.HP657.domain.user.service;

import com.yonamhackathon.HP657.domain.user.dto.ResponseGradeDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.domain.user.entity.Grade;
import com.yonamhackathon.HP657.domain.user.entity.Role;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.GradeRepository;
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
    private final GradeRepository gpaRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

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



    public ResponseGradeDto getUserGrade(String token) {
        String userEmail = jwtUtil.extractEmail(token);

        Optional<Grade> optionalGpa = gpaRepository.findByEmail(userEmail);

        if (optionalGpa.isPresent()) {
            Grade gpa = optionalGpa.get();
            ResponseGradeDto responseGpaDto = new ResponseGradeDto();
            responseGpaDto.setGrade(gpa.getGrade());
            responseGpaDto.setCount(gpa.getCount());
            return responseGpaDto;
        } else {
            throw new RuntimeException("GPA not found for user: " + userEmail);
        }
    }

    public User getUser(String token) {
        String userEmail = jwtUtil.extractEmail(token);
        return userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmail));
    }

    public ResponseUserInfoDto getUserInfo(String token) {
        String userEmail = jwtUtil.extractEmail(token);

        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseUserInfoDto.fromEntity(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }


}
