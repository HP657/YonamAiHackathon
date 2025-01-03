package com.yonamhackathon.HP657.domain.chat.service;

import com.yonamhackathon.HP657.domain.chat.dto.RequestSchedulesDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseSchedulesDto;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.chat.entity.Schedules;
import com.yonamhackathon.HP657.domain.chat.repository.RoomRepository;
import com.yonamhackathon.HP657.domain.chat.repository.SchedulesRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class SchedulesService {

    private final RoomRepository roomRepository;
    private final SchedulesRepository schedulesRepository;

    @Transactional
    public ResponseSchedulesDto createOrUpdateScheduleForRoom(Long roomId, RequestSchedulesDto requestSchedulesDto) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));

        Schedules schedule = schedulesRepository.findByRoom(room);

        if (schedule == null) {
            schedule = Schedules.builder()
                    .title(requestSchedulesDto.getTitle())
                    .date(requestSchedulesDto.getDate())
                    .time(requestSchedulesDto.getTime())
                    .room(room)
                    .build();
        } else {
            schedule.setTitle(requestSchedulesDto.getTitle());
            schedule.setDate(requestSchedulesDto.getDate());
            schedule.setTime(requestSchedulesDto.getTime());
        }

        schedulesRepository.save(schedule);

        return ResponseSchedulesDto.fromEntity(schedule);
    }



    @Transactional
    public ResponseSchedulesDto getScheduleForRoom(Long roomId) {
        Room room = roomRepository.findById(roomId).get();

        Schedules schedule = schedulesRepository.findByRoom(room);

        if (schedule == null) {
            return null;
        }

        return ResponseSchedulesDto.fromEntity(schedule);
    }


}
