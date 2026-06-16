package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.UserDTO;
import com.dev.topicjot.models.User;
import com.dev.topicjot.services.JwtService;
import com.dev.topicjot.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        User user = userService.getByEmailAndPassword(userDTO.getEmail(), userDTO.getPassword());
        if (user != null) {
            return ResponseEntity.ok(jwtService.generateToken(user.getEmail()));
        }
        return ResponseEntity.notFound().build();
    }
}
