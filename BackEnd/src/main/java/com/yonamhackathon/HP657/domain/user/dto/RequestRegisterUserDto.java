package com.yonamhackathon.HP657.domain.user.dto;

import com.yonamhackathon.HP657.domain.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestRegisterUserDto {
    @NotBlank(message = "이메일을 입력해주세요")
    private String email;

    @NotBlank(message = "이름을 입력해주세요")
    private String username;

    private String password;

    private int studentId;

    public User toEntity() {
        return User.builder()
                .email(email)
                .username(username)
                .password(password)
                .studentId(studentId)
                .GPA(3.5)
                .build();
    }

}