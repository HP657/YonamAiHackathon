package com.yonamhackathon.HP657.global.utility;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestTemplateUtil {

    private final RestTemplate restTemplate;

    public RestTemplateUtil(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public <T> T post(String url, Object request, Class<T> responseType) {
        return restTemplate.postForObject(url, request, responseType);
    }
}
