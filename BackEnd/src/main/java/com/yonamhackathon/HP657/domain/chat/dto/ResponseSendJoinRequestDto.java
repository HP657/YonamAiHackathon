package com.yonamhackathon.HP657.domain.chat.dto;

import com.yonamhackathon.HP657.domain.chat.entity.RoomRequest;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ResponseSendJoinRequestDto {
    private Long id;
    private ResponseCreateRoomDto room;
    private ResponseUserInfoDto user;
    private String status;
    private LocalDateTime requestedAt;


    public static ResponseSendJoinRequestDto fromEntity(RoomRequest roomRequest) {
        return ResponseSendJoinRequestDto.builder()
                .id(roomRequest.getRequestId())
                .room(ResponseCreateRoomDto.builder()
                        .roomId(roomRequest.getRoom().getRoomId())
                        .name(roomRequest.getRoom().getName())
                        .description(roomRequest.getRoom().getDescription())
                        .build())
                .user(ResponseUserInfoDto.fromEntity(roomRequest.getUser()))
                .requestedAt(roomRequest.getRequestedAt())
                .build();
    }
}
