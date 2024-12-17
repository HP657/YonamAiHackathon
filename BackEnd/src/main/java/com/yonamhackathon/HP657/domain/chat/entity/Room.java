package com.yonamhackathon.HP657.domain.chat.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.yonamhackathon.HP657.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String discription;

    @ManyToMany
    @JoinTable(
            name = "user_room",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @JsonBackReference
    private List<User> users = new ArrayList<>();

}
