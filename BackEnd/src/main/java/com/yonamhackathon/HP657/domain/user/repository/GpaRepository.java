package com.yonamhackathon.HP657.domain.user.repository;

import com.yonamhackathon.HP657.domain.user.entity.Gpa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GpaRepository extends JpaRepository<Gpa, String> {
    Optional<Gpa> findByEmail(String email);
}
