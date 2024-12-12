package com.yonamhackathon.HP657.global.common;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class SuccessResponse<T> {
    private int status = HttpStatus.OK.value();
    private T data;

    public SuccessResponse(T data) {
        this.data = data;
    }
}