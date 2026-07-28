import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Note } from '../models/note';
import { ApiService } from './api.service';
import { NOTE_ENDPOINTS } from '../constants/endpoints';
import { TopicStateService } from './topic-state.service';

@Injectable({
  providedIn: 'root',
})
export class NoteStateService {
  private readonly api = inject(ApiService);
  private readonly topicState = inject(TopicStateService);

  notes = signal<Note[]>([]);

  searchNotes() {
    const selectedTopic = this.topicState.selectedTopic();
    if (!this.validateSelectedTopic(selectedTopic?.id)) return;

    this.api.get<Note[]>(`${NOTE_ENDPOINTS.getNotes}/${selectedTopic!.id}`).subscribe({
      next: (res) => this.notes.set(res),
      error: (err) => console.error(err)
    });
  }

  saveNote(note: string) {
    const selectedTopic = this.topicState.selectedTopic();
    if (!this.validateSelectedTopic(selectedTopic?.id)) return;

    this.api.post<Note>(NOTE_ENDPOINTS.addNote, { topicId: selectedTopic!.id, content: note }).subscribe({
      next: () => this.searchNotes(),
      error: (err) => console.error(err),
    });
  }

  updateNote(note: Note) {
    if(!note || !note.id) {
      console.error('Invalid note object. Cannot update note.');
      return;
    }


    this.api.put<Note>(`${NOTE_ENDPOINTS.updateNote}/${note.id}`, note).subscribe({
      next: () => this.searchNotes(),
      error: (err) => console.error(err),
    });
  }

  deleteNote(id: number) {
    if (!id) {
      console.error('Invalid note ID. Cannot delete note.');
      return;
    }

    this.api.delete<Note>(`${NOTE_ENDPOINTS.deleteNote}/${id}`).subscribe({
      next: () => this.searchNotes(),
      error: (err) => console.error(err),
    });
  }

  toggleFavorite(id: number) {
    if (!id) {
      console.error('Invalid note ID. Cannot toggle favorite status.');
      return;
    }

    this.api.put<Note>(`${NOTE_ENDPOINTS.toggleFavorite}/${id}`, {}).subscribe({
      next: () => this.searchNotes(),
      error: (err) => console.error(err),
    });
  }

  private validateSelectedTopic(topicId?: number): boolean {
    if (!topicId) {
      console.log('No topic selected or topic ID is undefined. Cannot perform operation.');
      return false;
    }

    return true;
  }
}