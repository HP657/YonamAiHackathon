package com.yonamhackathon.HP657.domain.chat.dto;

import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseCreateRoomDto {
    private Long roomId;
    private String name;
    private String description;
    private ResponseUserInfoDto owner;
}