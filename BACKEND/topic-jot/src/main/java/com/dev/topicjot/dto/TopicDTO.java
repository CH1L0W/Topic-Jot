package com.dev.topicjot.dto;

import com.dev.topicjot.models.Topic;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TopicDTO {
    private Long id;
    private String title;
    private String description;
    private String cardColor;
    private String icon;
    private boolean favorite;
    private boolean erased;
    private Instant lastTimeOpened;
    private int notes;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    public TopicDTO(Topic topic) {
        this.id = topic.getId();
        this.title = topic.getTitle();
        this.description = topic.getDescription();
        this.cardColor = topic.getCardColor();
        this.icon = topic.getIcon();
        this.favorite = topic.isFavorite();
        this.erased = topic.isErased();
        this.lastTimeOpened = topic.getLastTimeOpened();
        this.notes = topic.getNotes().size();

        this.createdAt = topic.getCreatedAt();
        this.updatedAt = topic.getUpdatedAt();
        this.createdBy = topic.getCreatedBy();
        this.updatedBy = topic.getUpdatedBy();
    }
}
