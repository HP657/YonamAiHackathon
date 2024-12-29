package com.yonamhackathon.HP657.domain.AI.controller;

import com.yonamhackathon.HP657.domain.AI.dto.RequestEmotionDto;
import com.yonamhackathon.HP657.domain.AI.dto.ResponseEmotionDto;
import com.yonamhackathon.HP657.domain.AI.service.AIService;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.service.UserService;
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
@RequestMapping(ApiPath.AI_API_PATH)
public class AIController extends DefaultController {

    private final AIService aiService;
    private final UserService userService;

    @PostMapping("/analyze")
    public ResponseEntity<SuccessResponse<User>> analyzeEmotion(@RequestBody RequestEmotionDto requestEmotionDto) {
        ResponseEmotionDto emotionDto = aiService.analyzeEmotion(requestEmotionDto);
        User user = userService.setGPA(emotionDto, requestEmotionDto.getEmail());
        SuccessResponse<User> response = new SuccessResponse<>(user);

        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }
}
