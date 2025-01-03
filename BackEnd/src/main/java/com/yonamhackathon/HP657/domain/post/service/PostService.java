package com.yonamhackathon.HP657.domain.post.service;

import com.yonamhackathon.HP657.domain.post.dto.RequestCreatePostDto;
import com.yonamhackathon.HP657.domain.post.entity.Post;
import com.yonamhackathon.HP657.domain.post.repository.PostRepository;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final UserService userService;
    private final GcpService gcpService;
    private final PostRepository postRepository;

    public Post createPost(RequestCreatePostDto dto, String token) throws IOException {
        User user = userService.getUser(token);
        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContents(dto.getContents());
        post.setUser(user);
        post.setAuthor(dto.getAuthor() != null ? dto.getAuthor() : "익명");
        post.setCreatedAt(LocalDateTime.now());

        MultipartFile postImg = dto.getPostImg();
        if (postImg != null && !postImg.isEmpty()) {
            String postImgUrl = gcpService.uploadImage(postImg, "posts");
            post.setPostImgUrl(postImgUrl);
        }
        return postRepository.save(post);
    }

    public Post viewDetailPost(Long postId) {
        Post post = postRepository.findByPostId(postId).get();
        return post;
    }

    public boolean postDelete(Long postId) {
        Optional<Post> post = postRepository.findByPostId(postId);
        if (post.isPresent()) {
            String imageUrl = post.get().getPostImgUrl();

            return gcpService.deleteImage(imageUrl);
        }
        return false;
    }

    public List<Post> viewAllPost() {
        return postRepository.findAll();
    }

    public List<Post> userPost(String token) {
        User user = userService.getUser(token);
        return postRepository.findByUser(user);
    }
}
