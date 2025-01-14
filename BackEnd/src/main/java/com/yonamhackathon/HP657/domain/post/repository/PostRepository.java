package com.yonamhackathon.HP657.domain.post.repository;

import com.yonamhackathon.HP657.domain.post.entity.Post;
import com.yonamhackathon.HP657.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByPostId(Long postId);
    List<Post> findByUser(User user);
}
