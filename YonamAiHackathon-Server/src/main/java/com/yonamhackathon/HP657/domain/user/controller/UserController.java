package com.yonamhackathon.HP657.domain.user.controller;

import com.yonamhackathon.HP657.domain.jwt.dto.RequestCreateJwtDto;
import com.yonamhackathon.HP657.domain.jwt.dto.ResponseCreateJwtDto;
import com.yonamhackathon.HP657.domain.jwt.service.JwtService;
import com.yonamhackathon.HP657.domain.user.dto.RequestRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.USER_API_PATH)
public class UserController extends DefaultController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse<ResponseRegisterUserDto>> registerUser(@Valid @RequestBody RequestRegisterUserDto registerUserDto) {
        ResponseRegisterUserDto dto = userService.save(registerUserDto.toEntity());
        SuccessResponse<ResponseRegisterUserDto> response = new SuccessResponse<>(dto);

        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<ResponseCreateJwtDto>> createJwt(@Valid @RequestBody RequestCreateJwtDto createJwtDto) {
        ResponseCreateJwtDto dto = jwtService.createJwt(createJwtDto);
        SuccessResponse<ResponseCreateJwtDto> response = new SuccessResponse<>(dto);

        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }
}
