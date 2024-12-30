package com.yonamhackathon.HP657.domain.user.repository;

import com.yonamhackathon.HP657.domain.chat.entity.Room;
import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.entity.UserRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoomRepository extends JpaRepository<UserRoom, Long> {
    List<UserRoom> findByUser(User user); // For finding rooms by user
    boolean existsByUserAndRoom(User user, Room room); // For checking user-room existence
    List<UserRoom> findByRoom(Room room); // For finding users by room
}
