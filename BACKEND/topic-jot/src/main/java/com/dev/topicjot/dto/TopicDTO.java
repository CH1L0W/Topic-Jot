package com.dev.topicjot.dto;

import com.dev.topicjot.models.Topic;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TopicDTO(
        Long id,
        @NotBlank String title,
        @NotBlank String description,
        @NotBlank String cardColor,
        @NotBlank String icon,
        boolean favorite,
        boolean erased,
        Instant lastTimeOpened,
        int notes,
        Instant createdAt,
        Instant updatedAt,
        String createdBy,
        String updatedBy
) {
    public TopicDTO(Topic topic) {
        this(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription(),
                topic.getCardColor(),
                topic.getIcon(),
                topic.isFavorite(),
                topic.isErased(),
                topic.getLastTimeOpened(),
                topic.getNotes().size(),
                topic.getCreatedAt(),
                topic.getUpdatedAt(),
                topic.getCreatedBy(),
                topic.getUpdatedBy()
        );
    }
}
