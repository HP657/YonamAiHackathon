package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.dto.RequestMessageDto;
import com.yonamhackathon.HP657.domain.chat.entity.Message;
import com.yonamhackathon.HP657.domain.chat.serivce.MessageService;
import com.yonamhackathon.HP657.global.common.DefaultController;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final MessageService messageService;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}/messages")
    public Message sendMessage(@Payload RequestMessageDto dto, @DestinationVariable Long roomId, @Header("Authorization") String token) {
        token = token.substring(7);
        return messageService.saveMessage(dto, roomId, token);
    }
}
