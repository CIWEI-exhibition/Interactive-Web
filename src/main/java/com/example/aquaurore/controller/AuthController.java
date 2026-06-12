package com.example.aquaurore.controller;

import com.example.aquaurore.common.ApiResponse;
import com.example.aquaurore.config.JwtUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @Value("${admin.username}")
    private String adminUsername;

    @Value("${admin.password}")
    private String adminPassword;

    @PostMapping("/api/auth/login")
    public ApiResponse<TokenResponse> login(@RequestBody LoginRequest request) {
        if (!adminUsername.equals(request.getUsername()) ||
                !adminPassword.equals(request.getPassword())) {
            throw new IllegalArgumentException("잘못된 아이디 또는 비밀번호입니다.");
        }
        return ApiResponse.ok(new TokenResponse(jwtUtil.generate(adminUsername)));
    }

    @Getter
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Getter
    public static class TokenResponse {
        private final String token;
        public TokenResponse(String token) { this.token = token; }
    }
}
