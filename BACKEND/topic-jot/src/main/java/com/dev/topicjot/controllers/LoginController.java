package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.LoginDTO;
import com.dev.topicjot.models.User;
import com.dev.topicjot.services.JwtService;
import com.dev.topicjot.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody @Valid LoginDTO loginRequest) {
        User user = userService.getByEmailAndPassword(loginRequest.email(), loginRequest.password());
        if (user != null) {
            return ResponseEntity.ok(Map.of("token", jwtService.generateToken(user.getEmail())));
        }
        return ResponseEntity.notFound().build();
    }
}
