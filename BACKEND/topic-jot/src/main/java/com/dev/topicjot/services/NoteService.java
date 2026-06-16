package com.dev.topicjot.services;

import com.dev.topicjot.dto.NoteDTO;
import com.dev.topicjot.models.Note;
import com.dev.topicjot.repositories.NoteRepository;
import com.dev.topicjot.repositories.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final TopicRepository topicRepository;

    public List<NoteDTO> getNotesByTopic(Long topicId) {
        return this.noteRepository.findByTopicId(topicId).stream().map(NoteDTO::new).toList();
    }

    public void addNote(NoteDTO noteDTO) {
        Note note = new Note(noteDTO);
        note.setTopic(topicRepository.findById(noteDTO.getTopicId()).orElseThrow(() -> new RuntimeException("Topic Not Found")));
        this.noteRepository.save(note);
    }

    public void updateNote(Long id, NoteDTO noteDTO) {
        this.noteRepository.findById(id).ifPresent(existingNote -> {
            existingNote.setContent(noteDTO.getContent());
            existingNote.setTopic(topicRepository.findById(noteDTO.getTopicId()).orElseThrow(() -> new RuntimeException("Topic Not Found")));
            this.noteRepository.save(existingNote);
        });
    }

    public void deleteNote(Long id) {
        this.noteRepository.deleteById(id);
    }
}
