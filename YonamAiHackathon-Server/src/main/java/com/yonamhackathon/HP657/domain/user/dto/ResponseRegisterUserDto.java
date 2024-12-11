package com.yonamhackathon.HP657.domain.user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseRegisterUserDto {
    private Long userId;
    private String email;
}
