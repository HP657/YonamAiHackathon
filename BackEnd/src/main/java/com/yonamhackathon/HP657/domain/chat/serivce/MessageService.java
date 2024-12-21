package com.yonamhackathon.HP657.domain.chat.serivce;

import com.yonamhackathon.HP657.domain.chat.dto.RequestMessageDto;
import com.yonamhackathon.HP657.domain.chat.entity.Message;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.repository.MessageRepository;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRepository;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final UserService userService;

    public Message saveMessage(RequestMessageDto dto, Long roomId, String token) {
        User user = userService.getUser(token);
        Room room = roomRepository.findByRoomId(roomId);
        Message message = new Message();
        message.setUser(user);
        message.setContent(dto.getContent());
        message.setTimestamp(LocalDateTime.now());
        message.setRoom(room);

        return messageRepository.save(message);
    }
}
