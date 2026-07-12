package com.dev.topicjot.services;

import com.dev.topicjot.dto.TopicDTO;
import com.dev.topicjot.models.Topic;
import com.dev.topicjot.repositories.TopicRepository;
import com.dev.topicjot.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public List<TopicDTO> getTopics(Long userId) {
        return this.topicRepository.findByUserId(userId).stream().map(TopicDTO::new).toList();
    }

    public void addTopic(TopicDTO topicDTO) {
        Topic topic = new Topic(topicDTO);
        topic.setUser(userRepository.findById(topicDTO.getUserId()).orElseThrow(() -> new RuntimeException("user not found")));
        this.topicRepository.save(topic);
    }

    public void updateTopic(Long id, TopicDTO topicDTO) {
        this.topicRepository.findById(id).ifPresent(existingTopic -> {
            existingTopic.setTitle(topicDTO.getTitle());
            existingTopic.setUser(userRepository.findById(topicDTO.getUserId()).orElseThrow(() -> new RuntimeException("user not found")));
            this.topicRepository.save(existingTopic);
        });
    }

    public void deleteTopic(Long id) {
        this.topicRepository.deleteById(id);
    }
}
