package com.dev.topicjot.controllers;

import com.dev.topicjot.dto.NoteDTO;
import com.dev.topicjot.dto.validation.OnCreate;
import com.dev.topicjot.services.NoteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.groups.Default;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
@Validated
public class NoteController {
    private final NoteService noteService;

    @GetMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public List<NoteDTO> getNotesByTopic(
            @PathVariable @Positive Long topicId,
            @RequestParam(required = false) Boolean favorite,
            @RequestParam(required = false) Boolean erased
    ){
        return this.noteService.getNotesByTopic(topicId, favorite, erased);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addNote(@RequestBody @Validated({Default.class, OnCreate.class}) NoteDTO noteDTO) {
        this.noteService.addNote(noteDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateNote(@PathVariable @Positive Long id, @RequestBody @Valid NoteDTO noteDTO) {
        this.noteService.updateNote(id, noteDTO);
    }

    @PutMapping("/favorite/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void toggleFavorite(@PathVariable @Positive Long id) {
        this.noteService.toggleFavorite(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteNote(@PathVariable @Positive Long id) {
        this.noteService.deleteNote(id);
    }
}
