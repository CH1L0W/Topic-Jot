package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.NoteDTO;
import com.dev.topicjot.dto.TopicDTO;
import com.dev.topicjot.models.Note;
import com.dev.topicjot.services.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping("/{topicId}")
    public List<NoteDTO> getNotesByTopic(
            @PathVariable Long topicId,
            @RequestParam(required = false) Boolean favorite,
            @RequestParam(required = false) Boolean erased
    ){
        return this.noteService.getNotesByTopic(topicId, favorite, erased);
    }


    @PostMapping
    public ResponseEntity<Void> addNote(@RequestBody NoteDTO noteDTO) {
        this.noteService.addNote(noteDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNote(@PathVariable Long id, @RequestBody NoteDTO noteDTO) {
        this.noteService.updateNote(id, noteDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/favorite/{id}")
    public ResponseEntity<Void> toggleFavorite(@PathVariable Long id) {
        this.noteService.toggleFavorite(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        this.noteService.deleteNote(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
