package com.yonamhackathon.HP657.domain.user.dto;

import com.yonamhackathon.HP657.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseUserInfoDto {
    private Long userId;
    private String email;
    private String username;
    private int studentId;

    public static ResponseUserInfoDto fromEntity(User user) {
        return ResponseUserInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .username(user.getUsername())
                .studentId(user.getStudentId())
                .build();
    }
}
