package com.yonamhackathon.HP657.domain.chat.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestSchedulesDto {
    private String title;
    private LocalDate date;
    private LocalTime time;
}

