package com.yonamhackathon.HP657.domain.post.service;

import com.yonamhackathon.HP657.domain.post.dto.RequestCreatePostDto;
import com.yonamhackathon.HP657.domain.post.entity.Post;
import com.yonamhackathon.HP657.domain.post.repository.PostRepository;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService {
    private final UserService userService;
    private final PostRepository postRepository;

    public Post createPost(RequestCreatePostDto dto, String token) {
        User user = userService.getUser(token);
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContents(dto.getContents());
        post.setUser(user);
        post.setAuthor(dto.getAuthor() != null ? dto.getAuthor() : "익명");
        post.setCreatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }
}
