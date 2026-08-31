package com.dev.topicjot.dto;

import com.dev.topicjot.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        Long id,
        @NotBlank String name,
        @NotBlank @Email String email,
        @NotBlank String password
) {
    public UserDTO(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword());
    }
}
