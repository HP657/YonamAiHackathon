package com.yonamhackathon.HP657.domain.post.controller;

import com.google.api.Http;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(ApiPath.POST_API_PATH)
@RequiredArgsConstructor
public class PostController extends DefaultController {
    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<SuccessResponse<Post>> createPost(
            @RequestParam("title") String title,
            @RequestParam("contents") String contents,
            @RequestParam(value = "postImg", required = false) MultipartFile postImg,  // 파일은 선택적일 수 있음
            @RequestParam("author") String author,
            @RequestHeader("Authorization") String token
    ) throws IOException {
        RequestCreatePostDto dto = RequestCreatePostDto.builder()
                .title(title)
                .contents(contents)
                .postImg(postImg)
                .author(author)
                .build();

        token = token.substring(7);
        Post post = postService.createPost(dto, token);
        SuccessResponse<Post> response = new SuccessResponse<>(post);
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<SuccessResponse<Post>> detailPost(@PathVariable("postId") Long postId) {
        SuccessResponse<Post> response = new SuccessResponse<>(postService.viewDetailPost(postId));
        return  new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }


    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<SuccessResponse<Boolean>> postDelete(@PathVariable("postId") Long postId) {
        SuccessResponse<Boolean> response = new SuccessResponse<>(postService.postDelete(postId));
        return  new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<SuccessResponse<List<Post>>> viewAllPost() {
        SuccessResponse<List<Post>> response =  new SuccessResponse<>(postService.viewAllPost());
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<SuccessResponse<List<Post>>> userPost( @RequestHeader("Authorization") String token) {
        token = token.substring(7);
        SuccessResponse<List<Post>> response = new SuccessResponse<>(postService.userPost(token));
        return new ResponseEntity<>(response, createHttpHeaders(), HttpStatus.OK);
    }
}
