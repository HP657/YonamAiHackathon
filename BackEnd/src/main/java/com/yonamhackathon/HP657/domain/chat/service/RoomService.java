package com.yonamhackathon.HP657.domain.chat.service;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseRoomsDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseSendJoinRequestDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.entity.RoomRequest;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRepository;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRequestRepository;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.entity.UserRoom;
import com.yonamhackathon.HP657.domain.user.repository.UserRoomRepository;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final UserService userService;
    private final RoomRepository roomRepository;
    private final RoomRequestRepository roomRequestRepository;
    private final UserRoomRepository userRoomRepository;

    public List<ResponseRoomsDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream()
                .map(ResponseRoomsDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<ResponseRoomsDto> getUserRooms(String token) {
        User user = userService.getUser(token);
        return userRoomRepository.findByUser(user).stream()
                .map(userRoom -> ResponseRoomsDto.fromEntity(userRoom.getRoom()))
                .collect(Collectors.toList());
    }

    public ResponseRoomsDto roomInfo(Long roomId) {
        return ResponseRoomsDto.fromEntity(roomRepository.findByRoomId(roomId));
    }

    public ResponseCreateRoomDto createRoom(RequestCreateRoomDto dto, String token) {
        User user = userService.getUser(token);

        Room room = new Room();
        room.setName(dto.getRoomName());
        room.setDescription(dto.getDescription());
        room.setTopic(dto.getTopic());
        room.setOwner(user);

        Room savedRoom = roomRepository.save(room);

        UserRoom userRoom = new UserRoom();
        userRoom.setUser(user);
        userRoom.setRoom(savedRoom);
        userRoomRepository.save(userRoom);

        ResponseUserInfoDto ownerDto = ResponseUserInfoDto.fromEntity(user);
        return new ResponseCreateRoomDto(savedRoom.getRoomId(), savedRoom.getName(), savedRoom.getDescription(), ownerDto);
    }

    public String joinRoom(String token, Long roomId) {
        User user = userService.getUser(token);
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        if (userRoomRepository.existsByUserAndRoom(user, room)) {
            throw new RuntimeException("User already joined this room.");
        }

        UserRoom userRoom = new UserRoom();
        userRoom.setUser(user);
        userRoom.setRoom(room);
        userRoomRepository.save(userRoom);

        return "성공적인 방 가입";
    }

    public List<ResponseUserInfoDto> getRoomUsers(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        return userRoomRepository.findByRoom(room).stream()
                .map(userRoom -> ResponseUserInfoDto.fromEntity(userRoom.getUser())) // Extract User from UserRoom
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

        UserRoom userRoom = new UserRoom();
        userRoom.setUser(user);
        userRoom.setRoom(room);
        userRoomRepository.save(userRoom);

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

    public String deleteRoomIfGpaUpdated(Long roomId) {
        List<UserRoom> userRooms = userRoomRepository.findByRoom_RoomId(roomId);

        boolean allGpaUpdated = userRooms.stream()
                .allMatch(UserRoom::isGpaUpdated);

        if (allGpaUpdated) {
            roomRepository.deleteById(roomId);
            return "모든 평가를 마쳤기에 룸이 삭제되었습니다.";
        }
        return "";
    }
}
