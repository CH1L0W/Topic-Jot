package com.dev.topicjot.dto;

import com.dev.topicjot.dto.validation.OnCreate;
import com.dev.topicjot.models.Note;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record NoteDTO(
        Long id,
        @NotNull(groups = OnCreate.class) @Positive(groups = OnCreate.class) Long topicId,
        @NotBlank String content,
        boolean favorite,
        boolean erased,
        Instant createdAt,
        Instant updatedAt,
        String createdBy,
        String updatedBy
) {
    public NoteDTO(Note note) {
        this(
                note.getId(),
                null,
                note.getContent(),
                note.isFavorite(),
                note.isErased(),
                note.getCreatedAt(),
                note.getUpdatedAt(),
                note.getCreatedBy(),
                note.getUpdatedBy()
        );
    }
}
