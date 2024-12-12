package com.yonamhackathon.HP657.domain.jwt.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RequestCreateJwtDto {
    @NotBlank(message = "이메일을 입력해주세요")
    private String email;
    private String password;
}
