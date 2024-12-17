package com.yonamhackathon.HP657.domain.user.repository;

import com.yonamhackathon.HP657.domain.user.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<Grade, String> {
    Optional<Grade> findByEmail(String email);
}
