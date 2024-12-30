package com.yonamhackathon.HP657.domain.chat.dto;

import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
public class ResponseRoomsDto {
    private Long roomId;
    private String name;
    private String description;
    private ResponseUserInfoDto owner;

    public static ResponseRoomsDto fromEntity(Room room) {
        return ResponseRoomsDto.builder()
                .roomId(room.getRoomId())
                .name(room.getName())
                .description(room.getDescription())
                .owner(ResponseUserInfoDto.fromEntity(room.getOwner()))
                .build();
    }
}
