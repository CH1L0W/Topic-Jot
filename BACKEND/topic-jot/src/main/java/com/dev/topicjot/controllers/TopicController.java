package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.TopicDTO;
import com.dev.topicjot.models.User;
import com.dev.topicjot.services.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @GetMapping()
    public ResponseEntity<List<TopicDTO>> getAllTopics(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(this.topicService.getTopics(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Void> createTopic(@RequestBody TopicDTO topic, @AuthenticationPrincipal User user) {
        this.topicService.addTopic(topic, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTopic(@PathVariable Long id, @RequestBody TopicDTO topic, @AuthenticationPrincipal User user) {
        this.topicService.updateTopic(id, topic, user.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable Long id) {
        this.topicService.deleteTopic(id);
        return ResponseEntity.ok().build();
    }
}
