package com.yonamhackathon.HP657.domain.AI.controller;

import com.yonamhackathon.HP657.domain.AI.dto.RequestEmotionDto;
import com.yonamhackathon.HP657.domain.AI.dto.ResponseEmotionDto;
import com.yonamhackathon.HP657.domain.AI.service.AIService;
import com.yonamhackathon.HP657.domain.jwt.dto.ResponseCreateJwtDto;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.AI_API_ATH)
public class AIController extends DefaultController {

    private final AIService aiService;

    @PostMapping("/analyze")
    public ResponseEntity<SuccessResponse<ResponseEmotionDto>> analyzeEmotion(@RequestBody RequestEmotionDto requestEmotionDto) {
        ResponseEmotionDto dto = aiService.analyzeEmotion(requestEmotionDto);
        SuccessResponse<ResponseEmotionDto> response = new SuccessResponse<>(dto);

        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }
}
