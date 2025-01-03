package com.yonamhackathon.HP657.domain.chat.repository;

import com.yonamhackathon.HP657.domain.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoom_RoomId(Long roomId);

}
