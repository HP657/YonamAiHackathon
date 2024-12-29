package com.yonamhackathon.HP657.domain.AI.dto;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class RequestEmotionDto {
    private String sentence;
    private String email;
}
