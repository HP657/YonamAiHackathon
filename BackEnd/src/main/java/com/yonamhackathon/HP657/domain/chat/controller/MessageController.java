package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.entity.Message;
import com.yonamhackathon.HP657.domain.chat.service.MessageService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.CHAT_API_PATH)
public class MessageController extends DefaultController {
    private final MessageService messageService;

    @GetMapping("/{roomId}/messages")
    public ResponseEntity<SuccessResponse<List<Message>>> getMessages(@PathVariable("roomId") Long roomId) {
        SuccessResponse<List<Message>> response = new SuccessResponse<>(messageService.getMessages(roomId));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);

    }
}
