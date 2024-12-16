package com.yonamhackathon.HP657.domain.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Gpa {
    @Id
    private String email;

    @Column(nullable = false)
    private Double gpa;

    @Column
    private long count;


}
