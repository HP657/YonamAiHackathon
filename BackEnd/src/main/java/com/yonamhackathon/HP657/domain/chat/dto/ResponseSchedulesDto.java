package com.yonamhackathon.HP657.domain.chat.dto;

import com.yonamhackathon.HP657.domain.chat.entity.Schedules;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseSchedulesDto {
    private Long scheduleId;
    private String title;
    private LocalDate date;
    private LocalTime time;

    public static ResponseSchedulesDto fromEntity(Schedules schedules) {
        return ResponseSchedulesDto.builder()
                .scheduleId(schedules.getScheduleId())
                .title(schedules.getTitle())
                .date(schedules.getDate())
                .time(schedules.getTime())
                .build();
    }
}
