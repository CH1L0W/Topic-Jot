package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.TopicDTO;
import com.dev.topicjot.models.Topic;
import com.dev.topicjot.services.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<TopicDTO>> getAllTopics(@PathVariable Long userId) {
        return ResponseEntity.ok(this.topicService.getTopics(userId));
    }

    @PostMapping
    public ResponseEntity<Void> createTopic(@RequestBody TopicDTO topic) {
        this.topicService.addTopic(topic);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTopic(@PathVariable Long id, @RequestBody TopicDTO topic) {
        this.topicService.updateTopic(id, topic);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        this.topicService.deleteTopic(id);
        return ResponseEntity.ok().build();
    }
}
