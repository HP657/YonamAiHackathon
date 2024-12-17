package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.service.RoomService;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.CHAT_API_PATH)
public class RoomController extends DefaultController {

    private final RoomService roomService;

    // 모든 채팅방 가져오기
    @GetMapping("/all")
    public List<Room> getRooms() {
        return roomService.getAllRooms();
    }

    // 유저가 가입한 채팅방 가져오기
    @GetMapping("/user/rooms")
    public List<Room> getUserRooms(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        return roomService.getUserRooms(token);
    }

    // 채팅방 생성
    @PostMapping("/create")
    public Room createRoom(@RequestBody RequestCreateRoomDto dto, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        return roomService.createRoom(dto, token);
    }

    // 채팅방에 유저 가입
    @PostMapping("/{roomId}/join")
    public void joinRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        roomService.joinRoom(token, roomId);
    }

    @GetMapping("/{roomId}/users")
    public List<ResponseUserInfoDto> getRoomUsers(@PathVariable Long roomId) {
        return roomService.getRoomUsers(roomId);
    }


}
