package com.yonamhackathon.HP657.domain.user.controller;

import com.yonamhackathon.HP657.domain.jwt.dto.RequestCreateJwtDto;
import com.yonamhackathon.HP657.domain.jwt.dto.ResponseCreateJwtDto;
import com.yonamhackathon.HP657.domain.jwt.service.JwtService;
import com.yonamhackathon.HP657.domain.mail.dto.RequestSendEmailDto;
import com.yonamhackathon.HP657.domain.mail.dto.RequestVerificationCodeDto;
import com.yonamhackathon.HP657.domain.mail.service.MailService;
import com.yonamhackathon.HP657.domain.user.dto.ResponseGradeDto;
import com.yonamhackathon.HP657.domain.user.dto.RequestRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseRegisterUserDto;
import com.yonamhackathon.HP657.domain.user.dto.ResponseUserInfoDto;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.USER_API_PATH)
public class UserController extends DefaultController {
    private final UserService userService;
    private final MailService mailService;
    private final JwtService jwtService;

    @GetMapping("/gpa")
    public ResponseEntity<SuccessResponse<ResponseGradeDto>> getUserGpa(@RequestHeader("Authorization") String token) {
        token = token.substring(7);
        ResponseGradeDto dto = userService.getUserGpa(token);
        SuccessResponse<ResponseGradeDto> response = new SuccessResponse<>(dto);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }
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

    @GetMapping("/info")
    public ResponseEntity<SuccessResponse<ResponseUserInfoDto>> getUserInfo(@Valid @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        SuccessResponse<ResponseUserInfoDto> response = new SuccessResponse<>(userService.getUserInfo(token));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

    @PostMapping("/email/send")
    public ResponseEntity<String> sendEmail(@Valid @RequestBody RequestSendEmailDto sendEmailDto) {
        mailService.sendEmail(sendEmailDto);
        return new ResponseEntity<>("이메일 인증 메일 전송", createHttpHeaders(), HttpStatus.OK);
    }

    @PostMapping("/email/verification")
    public ResponseEntity<String> verification(@Valid @RequestBody RequestVerificationCodeDto verificationCodeDto) {
        boolean response = mailService.verifyCode(verificationCodeDto);
        if (response) {
            return new ResponseEntity<>("이메일 인증 완료", createHttpHeaders(), HttpStatus.OK);
        }
        return new ResponseEntity<>("이메일 인증 실패", createHttpHeaders(), HttpStatus.UNAUTHORIZED);
    }
}
