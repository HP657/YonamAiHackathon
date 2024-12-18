package com.yonamhackathon.HP657.domain.post.controller;

import com.yonamhackathon.HP657.domain.post.dto.RequestCreatePostDto;
import com.yonamhackathon.HP657.domain.post.entity.Post;
import com.yonamhackathon.HP657.domain.post.service.PostService;
import com.yonamhackathon.HP657.global.common.ApiPath;
import com.yonamhackathon.HP657.global.common.DefaultController;
import com.yonamhackathon.HP657.global.common.SuccessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPath.POST_API_PATH)
@RequiredArgsConstructor
public class PostController extends DefaultController {
    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<SuccessResponse<Post>> createPost(@Valid @RequestBody RequestCreatePostDto dto, @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        Post post = postService.createPost(dto, token);
        SuccessResponse<Post> response = new SuccessResponse<>(post);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

}
