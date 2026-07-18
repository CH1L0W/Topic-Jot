package com.dev.topicjot.dto;

import com.dev.topicjot.models.Note;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NoteDTO {
    private Long id;
    private Long topicId;
    private String title;
    private String content;
    private boolean favorite;
    private boolean erased;

    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    public NoteDTO(Note note) {
        this.id = note.getId();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.favorite = note.isFavorite();
        this.erased = note.isErased();

        this.createdAt = note.getCreatedAt();
        this.updatedAt = note.getUpdatedAt();
        this.createdBy = note.getCreatedBy();
        this.updatedBy = note.getUpdatedBy();
    }
}
