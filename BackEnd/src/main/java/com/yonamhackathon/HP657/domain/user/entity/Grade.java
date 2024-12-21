package com.yonamhackathon.HP657.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Grade {
    @Id
    private String email;

    @Column(nullable = false)
    private Double grade;

    @Column
    private long count;

    @OneToOne(mappedBy = "grade")
    @JsonIgnore
    private User user;
}
