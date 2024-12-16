package com.yonamhackathon.HP657.domain.AI.dto;

import lombok.Data;

@Data
public class ResponseEmotionDto {
    private String sentence;
    private String emotion;
    private Double score;
}
