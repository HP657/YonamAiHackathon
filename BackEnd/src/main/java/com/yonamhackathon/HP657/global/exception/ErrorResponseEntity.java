package com.yonamhackathon.HP657.global.exception;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.ResponseEntity;

@Data
@Builder
public class ErrorResponseEntity {
    private int status;
    private String name;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> toResponseEntity(ErrorCode e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(ErrorResponseEntity.builder()
                        .status(e.getStatus().value())
                        .name(e.name())
                        .message(e.getMessage())
                        .build());
    }
}