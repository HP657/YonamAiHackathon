package com.yonamhackathon.HP657.domain.chat.controller;

import com.yonamhackathon.HP657.domain.chat.dto.RequestCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseCreateRoomDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseRoomsDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseSendJoinRequestDto;
import com.yonamhackathon.HP657.domain.chat.entity.RoomRequest;
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

    @GetMapping("/all")
    public ResponseEntity<SuccessResponse<List<ResponseRoomsDto>>> getRooms() {
        List<ResponseRoomsDto> rooms = roomService.getAllRooms();
        SuccessResponse<List<ResponseRoomsDto>> response = new SuccessResponse<>(rooms);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/user/rooms")
    public ResponseEntity<SuccessResponse<List<ResponseRoomsDto>>> getUserRooms(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        List<ResponseRoomsDto> userRooms = roomService.getUserRooms(token);
        SuccessResponse<List<ResponseRoomsDto>> response = new SuccessResponse<>(userRooms);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<SuccessResponse<ResponseCreateRoomDto>> createRoom(@RequestBody RequestCreateRoomDto dto, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        ResponseCreateRoomDto room = roomService.createRoom(dto, token);
        SuccessResponse<ResponseCreateRoomDto> response = new SuccessResponse<>(room);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

    @PostMapping("/{roomId}/join")
    public ResponseEntity<SuccessResponse<String>> joinRoom(@PathVariable Long roomId, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        SuccessResponse<String> response = new SuccessResponse<>(roomService.joinRoom(token, roomId));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/{roomId}/users")
    public ResponseEntity<SuccessResponse<List<ResponseUserInfoDto>>> getRoomUsers(@PathVariable Long roomId) {
        List<ResponseUserInfoDto> users = roomService.getRoomUsers(roomId);
        SuccessResponse<List<ResponseUserInfoDto>> response = new SuccessResponse<>(users);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/{roomId}/request")
    public ResponseEntity<SuccessResponse<ResponseSendJoinRequestDto>> sendJoinRequest(
            @PathVariable Long roomId,
            @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        ResponseSendJoinRequestDto request = roomService.roomRequest(roomId, token);
        SuccessResponse<ResponseSendJoinRequestDto> response = new SuccessResponse<>(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/request/{requestId}/approve")
    public ResponseEntity<SuccessResponse<String>> approveRequest(
            @PathVariable Long requestId) {
        roomService.approveRoomRequest(requestId);
        SuccessResponse<String> response = new SuccessResponse<>("승인");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/request/{requestId}/reject")
    public ResponseEntity<SuccessResponse<String>> rejectRequest(
            @PathVariable Long requestId) {
        roomService.rejectRoomRequest(requestId);
        SuccessResponse<String> response = new SuccessResponse<>("승인 거절");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{roomId}/requests/pending")
    public ResponseEntity<SuccessResponse<List<RoomRequest>>> getPendingRequests(
            @PathVariable Long roomId) {
        List<RoomRequest> pendingRequests = roomService.getPendingRequestsForRoom(roomId);
        SuccessResponse<List<RoomRequest>> response = new SuccessResponse<>(pendingRequests);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{roomId}/request/status")
    public ResponseEntity<SuccessResponse<RoomRequest>> checkRequestStatus(
            @PathVariable Long roomId,
            @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        RoomRequest requestStatus = roomService.checkRequestStatus(roomId, token);
        SuccessResponse<RoomRequest> response = new SuccessResponse<>(requestStatus);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
