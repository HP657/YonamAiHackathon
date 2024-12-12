package com.yonamhackathon.HP657.domain.jwt.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseCreateJwtDto {
    private String token;
}
