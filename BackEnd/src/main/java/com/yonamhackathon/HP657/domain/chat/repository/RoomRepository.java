package com.yonamhackathon.HP657.domain.chat.repository;

import com.yonamhackathon.HP657.domain.chat.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByRoomId(Long roomId);
}
