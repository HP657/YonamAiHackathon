package com.yonamhackathon.HP657.domain.mail.service;

import com.yonamhackathon.HP657.domain.mail.dto.RequestSendEmailDto;
import com.yonamhackathon.HP657.domain.mail.dto.RequestVerificationCodeDto;
import com.yonamhackathon.HP657.domain.mail.entity.VerificationCode;
import com.yonamhackathon.HP657.domain.mail.repository.MailRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private final MailRepository mailRepository;

    public void sendEmail(RequestSendEmailDto dto) {
        String verificationCode = generateRandomCode();
        String emailContent = createEmailContent(verificationCode);

        try {
            sendHtmlEmail(dto.getEmail(), emailContent);
            saveVerificationCode(dto.getEmail(), verificationCode);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 중 오류 발생: " + e.getMessage(), e);
        }
    }

    private String createEmailContent(String verificationCode) {
        return """
                <html>
                    <body>
                        <h1>인증 코드: %s</h1>
                        <p>해당 코드를 회원가입 창에 입력하세요.</p>
                        <footer style='color: grey; font-size: small;'>
                            <p>본 메일은 자동응답 메일이므로 본 메일에 회신하지 마시기 바랍니다.</p>
                        </footer>
                    </body>
                </html>
                """.formatted(verificationCode);
    }

    private void sendHtmlEmail(String toEmail, String content) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        helper.setTo(toEmail);
        helper.setSubject("이메일 인증 번호");
        helper.setText(content, true);

        javaMailSender.send(mimeMessage);
    }

    private void saveVerificationCode(String email, String code) {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpiresTime(LocalDateTime.now().plusMinutes(10));
        mailRepository.save(verificationCode);
    }

    public String generateRandomCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        ThreadLocalRandom random = ThreadLocalRandom.current();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            sb.append(characters.charAt(index));
        }
        return sb.toString();
    }

    public boolean verifyCode(RequestVerificationCodeDto dto) {
        return mailRepository.findByEmailAndCode(dto.getEmail(), dto.getCode())
                .filter(vc -> vc.getExpiresTime().isAfter(LocalDateTime.now()))
                .isPresent(); 
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * ?")
    public void deleteExpiredVerificationCodes() {
        mailRepository.deleteByExpiresTimeBefore(LocalDateTime.now());
    }
}
