package com.dev.topicjot.dto;

import com.dev.topicjot.models.Topic;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TopicDTO {
    private Long id;
    private Long userId;
    private String name;

    public TopicDTO(Topic topic) {
        this.id = topic.getId();
        this.name = topic.getName();
    }
}
