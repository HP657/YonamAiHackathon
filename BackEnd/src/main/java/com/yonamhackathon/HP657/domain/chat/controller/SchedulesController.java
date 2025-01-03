package com.yonamhackathon.HP657.domain.chat.controller;

import com.google.api.Http;
import com.yonamhackathon.HP657.domain.chat.dto.RequestSchedulesDto;
import com.yonamhackathon.HP657.domain.chat.dto.ResponseSchedulesDto;
import com.yonamhackathon.HP657.domain.chat.service.SchedulesService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.SCHEDULES_PATH)
@RequiredArgsConstructor
public class SchedulesController extends DefaultController {

    private final SchedulesService schedulesService;

    @PostMapping("/room/{roomId}")
    public ResponseEntity<SuccessResponse<ResponseSchedulesDto>> createOrUpdateScheduleForRoom(
            @PathVariable Long roomId,
            @RequestBody RequestSchedulesDto requestSchedulesDto) {
        SuccessResponse<ResponseSchedulesDto> response =
                new SuccessResponse<>(schedulesService.createOrUpdateScheduleForRoom(roomId, requestSchedulesDto));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }


    @GetMapping("/room/{roomId}")
    public ResponseEntity<SuccessResponse<ResponseSchedulesDto>> getScheduleForRoom(@PathVariable Long roomId) {
        SuccessResponse<ResponseSchedulesDto> response = new SuccessResponse<>(schedulesService.getScheduleForRoom(roomId));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }
}
