package com.yonamhackathon.HP657.domain.chat.service;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseSendJoinRequestDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.entity.RoomRequest;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRepository;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRequestRepository;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserService userService;
    private final RoomRepository roomRepository;
    private final RoomRequestRepository roomRequestRepository;
    private final UserRepository userRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getUserRooms(String token) {
        User user = userService.getUser(token);
        return user.getRooms();
    }

    public ResponseCreateRoomDto createRoom(RequestCreateRoomDto dto, String token) {
        User user = userService.getUser(token);

        Room room = new Room();
        room.setName(dto.getRoomName());
        room.setDescription(dto.getDescription());
        room.setOwner(user);

        user.getRooms().add(room);
        room.getUsers().add(user);

        Room savedRoom = roomRepository.save(room);

        ResponseUserInfoDto ownerDto = ResponseUserInfoDto.fromEntity(user);
        return new ResponseCreateRoomDto(savedRoom.getRoomId(), savedRoom.getName(), savedRoom.getDescription(), ownerDto);
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

    public ResponseSendJoinRequestDto roomRequest(Long roomId, String token) {
        User user = userService.getUser(token);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        Optional<RoomRequest> existingRequest = roomRequestRepository.findByRoomAndUser(room, user);
        if (existingRequest.isPresent()) {
            throw new IllegalStateException("이미 대기 중인 요청이 있습니다.");
        }

        RoomRequest roomRequest = new RoomRequest();
        roomRequest.setRoom(room);
        roomRequest.setUser(user);

        RoomRequest savedRoomRequest = roomRequestRepository.save(roomRequest);

        return ResponseSendJoinRequestDto.fromEntity(savedRoomRequest);
    }


    public void approveRoomRequest(Long requestId) {
        RoomRequest roomRequest = roomRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        Room room = roomRequest.getRoom();
        User user = roomRequest.getUser();

        room.getUsers().add(user);
        user.getRooms().add(room);

        roomRepository.save(room);
        userRepository.save(user);

        roomRequestRepository.delete(roomRequest);
    }

    public void rejectRoomRequest(Long requestId) {
        RoomRequest roomRequest = roomRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        roomRequestRepository.delete(roomRequest);
    }


    public RoomRequest checkRequestStatus(Long roomId, String token) {
        User user = userService.getUser(token);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        return roomRequestRepository.findByRoomAndUser(room, user)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));
    }

    public List<RoomRequest> getPendingRequestsForRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));

        return roomRequestRepository.findByRoom(room);
    }
}
