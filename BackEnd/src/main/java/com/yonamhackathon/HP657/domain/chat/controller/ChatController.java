package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.dto.RequestMessageDto;
import com.yonamhackathon.HP657.domain.chat.entity.Message;
import com.yonamhackathon.HP657.domain.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

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
