package com.dev.topicjot.dto;

import com.dev.topicjot.models.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;

    public UserDTO(User user) {
        this.id = user.getId();
        name = user.getName();
        email = user.getEmail();
        password = user.getPassword();
    }
}
