package com.yonamhackathon.HP657.domain.jwt.controller;

import com.yonamhackathon.HP657.domain.jwt.service.JwtService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.utility.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(ApiPath.JWT_API_PATH)
public class JwtController extends DefaultController {
private final JwtService jwtService;
private final JwtUtil jwtUtil;

    @GetMapping("/check")
    public boolean checkToken(HttpServletRequest request, @RequestHeader("Authorization") String token) {
        if (token != null) {
            String jwt = token.substring(7);

            try {
                String email = jwtUtil.extractEmail(jwt);
                return jwtUtil.validateToken(jwt, email);
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

}
