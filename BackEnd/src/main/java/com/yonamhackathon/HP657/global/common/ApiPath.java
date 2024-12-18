package com.yonamhackathon.HP657.global.common;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class ApiPath {
    public static final String BASE_PATH = "/api";
    public static final String USER_API_PATH = BASE_PATH + "/user";
    public static final String JWT_API_PATH = BASE_PATH + "/token";
    public static final String ADMIN_API_PATH = BASE_PATH + "/admin";
    public static final String AI_API_PATH = BASE_PATH + "/ai";
    public static final String CHAT_API_PATH = BASE_PATH + "/chat";
    public static final String ROOM_API_PATH = BASE_PATH + "/room";
    public static final String WS_API_PATH = BASE_PATH + "/ws";

    public static String H2_PATH;

    @Value("${spring.h2.console.path}")
    private String h2Path;

    @PostConstruct
    public void init() {
        H2_PATH = h2Path;
    }
}
