package com.dev.topicjot.models;

import com.dev.topicjot.dto.TopicDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.List;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String cardColor;
    private String icon;
    private boolean favorite;
    private boolean erased;
    private Instant lastTimeOpened;

    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    private List<Note> notes;

    public Topic(TopicDTO topicDTO) {
        this.title = topicDTO.getTitle();
        this.description = topicDTO.getDescription();
        this.cardColor = topicDTO.getCardColor();
        this.icon = topicDTO.getIcon();
        this.favorite = topicDTO.isFavorite();
        this.erased = topicDTO.isErased();
        this.lastTimeOpened = Instant.now();
    }
}
