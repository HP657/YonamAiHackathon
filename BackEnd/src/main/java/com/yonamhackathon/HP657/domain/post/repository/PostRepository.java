package com.yonamhackathon.HP657.domain.post.repository;

import com.yonamhackathon.HP657.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
