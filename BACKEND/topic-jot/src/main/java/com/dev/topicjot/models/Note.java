package com.dev.topicjot.models;

import com.dev.topicjot.dto.NoteDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private Topic topic;

    public Note(NoteDTO noteDTO) {
        this.content = noteDTO.getContent();
    }
}
