package com.yonamhackathon.HP657.domain.jwt.controller;

import com.yonamhackathon.HP657.domain.jwt.service.JwtService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.JWT_API_PATH)
public class JwtController extends DefaultController {
private final JwtService jwtService;

    @GetMapping("/check")
    public boolean checkToken() {
        return true;
    }
}
