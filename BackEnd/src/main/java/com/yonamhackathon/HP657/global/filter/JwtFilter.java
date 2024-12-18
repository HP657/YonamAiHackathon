package com.yonamhackathon.HP657.global.filter;

import com.yonamhackathon.HP657.domain.user.entity.User;
import com.yonamhackathon.HP657.domain.user.repository.UserRepository;
import com.yonamhackathon.HP657.global.exception.CustomException;
import com.yonamhackathon.HP657.global.exception.ErrorCode;
import com.yonamhackathon.HP657.global.exception.ErrorResponseEntity;
import com.yonamhackathon.HP657.global.utility.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            String jwt = extractJwtFromRequest(request);
            if (jwt != null) {
                String email = jwtUtil.extractEmail(jwt);
                authenticateUser(jwt, email, request);
            }
            chain.doFilter(request, response);
        } catch (CustomException e) {
            handleCustomException(response, e);
        }
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    private void authenticateUser(String jwt, String email, HttpServletRequest request) {
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(jwt, email)) {
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email, null, user.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                throw new CustomException(ErrorCode.UNAUTHORIZED);
            }
        }
    }

    private void handleCustomException(HttpServletResponse response, CustomException e) throws IOException {
        ErrorResponseEntity errorResponse = ErrorResponseEntity.builder()
                .status(e.getErrorCode().getStatus().value())
                .name(e.getErrorCode().name())
                .message(e.getErrorCode().getMessage())
                .build();
        response.setStatus(e.getErrorCode().getStatus().value());
        response.setContentType("application/json");
        response.getWriter().write(errorResponse.toString());
    }
}
