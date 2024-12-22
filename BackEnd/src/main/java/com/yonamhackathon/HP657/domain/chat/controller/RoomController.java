package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.service.RoomService;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
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
@RequestMapping(ApiPath.ROOM_API_PATH)
public class RoomController extends DefaultController {

    private final RoomService roomService;

    // 모든 채팅방 가져오기
    @GetMapping("/all")
    public ResponseEntity<SuccessResponse<List<Room>>> getRooms() {
        List<Room> rooms = roomService.getAllRooms();
        SuccessResponse<List<Room>> response = new SuccessResponse<>(rooms);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    // 유저가 가입한 채팅방 가져오기
    @GetMapping("/user/rooms")
    public ResponseEntity<SuccessResponse<List<Room>>> getUserRooms(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        List<Room> userRooms = roomService.getUserRooms(token);
        SuccessResponse<List<Room>> response = new SuccessResponse<>(userRooms);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    // 채팅방 생성
    @PostMapping("/create")
    public ResponseEntity<SuccessResponse<Room>> createRoom(@RequestBody RequestCreateRoomDto dto, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        Room room = roomService.createRoom(dto, token);
        SuccessResponse<Room> response = new SuccessResponse<>(room);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

    // 채팅방에 유저 가입
    @PostMapping("/{roomId}/join")
    public ResponseEntity<SuccessResponse<String>> joinRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        SuccessResponse<String> response = new SuccessResponse<>(roomService.joinRoom(token, roomId));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    // 채팅방의 유저 가져오기
    @GetMapping("/{roomId}/users")
    public ResponseEntity<SuccessResponse<List<ResponseUserInfoDto>>> getRoomUsers(@PathVariable Long roomId) {
        List<ResponseUserInfoDto> users = roomService.getRoomUsers(roomId);
        SuccessResponse<List<ResponseUserInfoDto>> response = new SuccessResponse<>(users);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }
}
