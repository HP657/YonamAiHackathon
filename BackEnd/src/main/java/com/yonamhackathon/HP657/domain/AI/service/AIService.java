package com.yonamhackathon.HP657.domain.AI.service;

import com.yonamhackathon.HP657.domain.AI.dto.RequestEmotionDto;
import com.yonamhackathon.HP657.domain.AI.dto.ResponseEmotionDto;
import com.yonamhackathon.HP657.global.utility.RestTemplateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {
    private final RestTemplateUtil restTemplateUtil;

    public ResponseEmotionDto analyzeEmotion(RequestEmotionDto dto) {
        String url = "http://localhost:8000/api/analyze_emotion";
        return restTemplateUtil.post(url, dto, ResponseEmotionDto.class);
    }
}
