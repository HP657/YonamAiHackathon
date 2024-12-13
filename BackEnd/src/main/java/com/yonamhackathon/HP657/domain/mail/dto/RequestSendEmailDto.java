package com.yonamhackathon.HP657.domain.mail.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class RequestSendEmailDto {

    @NotEmpty(message = "이메일 주소는 필수입니다.")
    @Email(message = "유효한 이메일 주소를 입력하세요.")
    private String email;
}
