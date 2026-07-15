package com.dev.topicjot.services;

import com.dev.topicjot.dto.TopicDTO;
import com.dev.topicjot.models.Topic;
import com.dev.topicjot.repositories.TopicRepository;
import com.dev.topicjot.repositories.UserRepository;
import com.dev.topicjot.repositories.specifications.TopicSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public List<TopicDTO> getTopics(long userId, Boolean favorite, Boolean recent, Boolean erased) {
        List<Topic> topics;
        Sort sort = Sort.by(
                Sort.Order.desc("lastTimeOpened"),
                Sort.Order.desc("updatedAt")
        );

        Specification<Topic> specs = Specification
                .where(TopicSpecifications.hasUserId(userId))
                .and(TopicSpecifications.hasFavorite(favorite))
                .and(TopicSpecifications.hasErased(erased));

        if (Boolean.TRUE.equals(recent)) {
            Pageable topN = PageRequest.of(0, 10, sort);
            topics = topicRepository.findAll(specs, topN).toList();
        } else {
            topics = this.topicRepository.findAll(specs, sort);
        }

        return topics.stream().map(TopicDTO::new).toList();
    }

    public void addTopic(TopicDTO topicDTO, Long userId) {
        Topic topic = new Topic(topicDTO);
        topic.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found")));
        this.topicRepository.save(topic);
    }

    public void updateTopic(Long id, TopicDTO topicDTO, Long userId) {
        this.topicRepository.findById(id).ifPresent(existingTopic -> {
            existingTopic.setTitle(topicDTO.getTitle());
            existingTopic.setDescription(topicDTO.getDescription());
            existingTopic.setCardColor(topicDTO.getCardColor());
            existingTopic.setIcon(topicDTO.getIcon());
            existingTopic.setFavorite(topicDTO.isFavorite());
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

    public void toggleFavorite(Long id) {
        this.topicRepository.findById(id).ifPresent(existingTopic -> {
            existingTopic.setFavorite(!existingTopic.isFavorite());
            this.topicRepository.save(existingTopic);
        });
    }
}
