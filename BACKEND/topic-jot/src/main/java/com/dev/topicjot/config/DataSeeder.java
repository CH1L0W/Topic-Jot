package com.dev.topicjot.config;

import com.dev.topicjot.models.User;
import com.dev.topicjot.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User user = new User();
            user.setName("Mario");
            user.setEmail("mario@correo.com");
            user.setPassword(passwordEncoder.encode("prueba"));
            userRepository.save(user);
        };
    }
}
