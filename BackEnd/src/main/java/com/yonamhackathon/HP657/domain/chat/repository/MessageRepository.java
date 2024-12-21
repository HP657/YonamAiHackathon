package com.yonamhackathon.HP657.domain.chat.repository;

import com.yonamhackathon.HP657.domain.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
