package com.dev.topicjot.config;

import com.dev.topicjot.models.Topic;
import com.dev.topicjot.models.User;
import com.dev.topicjot.repositories.TopicRepository;
import com.dev.topicjot.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;

@Configuration
public class DataSeeder {
    @Bean
    public CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder, TopicRepository topicRepository) {
        return args -> {
            User user = new User();
            user.setName("Mario");
            user.setEmail("mario@correo.com");
            user.setPassword(passwordEncoder.encode("prueba"));
            userRepository.save(user);

            Topic topic = new Topic();
            topic.setUser(user);
            topic.setTitle("Topic test");
            topic.setDescription("Topic description test");
            topic.setCardColor("#C52020");
            topic.setIcon("Tech");
            topic.setFavorite(true);
            topic.setErased(false);
            topic.setLastTimeOpened(Instant.now());
            topicRepository.save(topic);
        };
    }
}
