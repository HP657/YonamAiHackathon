package com.yonamhackathon.HP657.domain.chat.repository;

import com.yonamhackathon.HP657.domain.chat.entity.RoomRequest;
import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {
    Optional<RoomRequest> findByRoomAndUser(Room room, User user);
    List<RoomRequest> findByRoom(Room room);
}
