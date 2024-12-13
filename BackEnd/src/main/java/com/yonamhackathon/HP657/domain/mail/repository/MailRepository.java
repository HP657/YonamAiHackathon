package com.yonamhackathon.HP657.domain.mail.repository;

import com.yonamhackathon.HP657.domain.mail.entity.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface MailRepository extends JpaRepository<VerificationCode, Long> {
    Optional<VerificationCode> findByEmailAndCode(String email, String code);

    void deleteByExpiresTimeBefore(LocalDateTime expiresTime);
}
