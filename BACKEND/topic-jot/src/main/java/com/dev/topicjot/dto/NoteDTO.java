package com.dev.topicjot.dto;

import com.dev.topicjot.models.Note;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NoteDTO {
    private Long id;
    private Long topicId;
    private String content;

    public NoteDTO(Note note) {
        this.id = note.getId();
        this.content = note.getContent();
    }
}
