package com.yonamhackathon.HP657.domain.chat.service;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRepository;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserService userService;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getUserRooms(String token) {
        User user = userService.getUser(token);
        return user.getRooms();
    }

    public Room createRoom(RequestCreateRoomDto dto, String token) {
        User user = userService.getUser(token);
        Room room = new Room();
        room.setName(dto.getRoomName());
        room.setDiscription(dto.getDiscription());
        room = roomRepository.save(room);

        user.getRooms().add(room);
        room.getUsers().add(user);

        userRepository.save(user);
        roomRepository.save(room);

        return room;
    }

    public String joinRoom(String token, Long roomId) {
        User user = userService.getUser(token);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        if (user.getRooms().contains(room)) {
            throw new RuntimeException("User already joined this room.");
        }

        user.getRooms().add(room);
        room.getUsers().add(user);

        userRepository.save(user);
        roomRepository.save(room);

        return "성공적인 방 가입";
    }



    public List<ResponseUserInfoDto> getRoomUsers(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        return room.getUsers()
                .stream()
                .map(ResponseUserInfoDto::fromEntity)
                .toList();
    }
}
