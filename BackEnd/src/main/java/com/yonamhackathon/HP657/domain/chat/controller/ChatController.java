package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(ApiPath.WS_API_PATH)
public class ChatController extends DefaultController {

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}/messages")
    public String sendMessage(String message, @DestinationVariable String roomId) {
        return message;
    }
}
