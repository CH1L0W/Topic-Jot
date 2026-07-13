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
        return this.topicRepository.findByUserIdAndErasedFalse(userId).stream().map(TopicDTO::new).toList();
    }

    public void addTopic(TopicDTO topicDTO, Long userId) {
        Topic topic = new Topic(topicDTO);
        topic.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found")));
        this.topicRepository.save(topic);
    }

    public void updateTopic(Long id, TopicDTO topicDTO, Long userId) {
        this.topicRepository.findById(id).ifPresent(existingTopic -> {
            existingTopic.setTitle(topicDTO.getTitle());
            existingTopic.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found")));
            this.topicRepository.save(existingTopic);
        });
    }

    public void deleteTopic(Long id) {
        this.topicRepository.findById(id).ifPresent(existingTopic -> {
            existingTopic.setErased(true);
            this.topicRepository.save(existingTopic);
        });
    }
}
