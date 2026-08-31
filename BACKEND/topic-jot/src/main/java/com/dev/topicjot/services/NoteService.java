package com.dev.topicjot.services;

import com.dev.topicjot.dto.NoteDTO;
import com.dev.topicjot.exceptions.ResourceNotFoundException;
import com.dev.topicjot.models.Note;
import com.dev.topicjot.models.Topic;
import com.dev.topicjot.repositories.NoteRepository;
import com.dev.topicjot.repositories.TopicRepository;
import com.dev.topicjot.repositories.specifications.NoteSpecifications;
import com.dev.topicjot.repositories.specifications.TopicSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;
    private final TopicRepository topicRepository;

    public List<NoteDTO> getNotesByTopic(Long topicId, Boolean favorite, Boolean erased) {
        Sort sort = Sort.by(
                Sort.Order.desc("createdAt")
        );

        Specification<Note> specs = Specification
                .where(NoteSpecifications.hasTopicId(topicId))
                .and(NoteSpecifications.hasFavorite(favorite));

        if(Boolean.TRUE.equals(erased)){
            specs = Specification
                    .where(NoteSpecifications.hasTopicId(topicId))
                    .and(NoteSpecifications.hasErased());
        }

        List<Note> notes = this.noteRepository.findAll(specs, sort);

        if(notes.isEmpty()){
            throw new ResourceNotFoundException("No notes found");
        }

        return notes.stream().map(NoteDTO::new).toList();
    }

    public void addNote(NoteDTO noteDTO) {
        Note note = new Note(noteDTO);
        note.setTopic(topicRepository.findById(noteDTO.topicId()).orElseThrow(() -> new ResourceNotFoundException("Topic Not Found")));
        this.noteRepository.save(note);
    }

    public void updateNote(Long id, NoteDTO noteDTO) {
        Note note =  this.noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note Not Found"));
        note.setContent(noteDTO.content());
        this.noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        this.noteRepository.deleteById(id);
    }

    public void toggleFavorite(Long id) {
        Note note =  this.noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note Not Found"));
        note.setFavorite(!note.isFavorite());
        this.noteRepository.save(note);
    }
}
