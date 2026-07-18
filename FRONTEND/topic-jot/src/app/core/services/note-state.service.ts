import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Notes } from '../models/notes';
import { ApiService } from './api.service';
import { NOTE_ENDPOINTS } from '../constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class NoteStateService {
  private readonly api = inject(ApiService);
  notes = signal<Notes[]>([]);

  searchNotes(topicId: number) {
    this.api.get<Notes[]>(`${NOTE_ENDPOINTS.getNotes}/${topicId}`).subscribe({
      next: (res) => {
        this.notes.set(res);
        console.log(this.notes());
      },
      error: (err) => console.error(err),
    });
  }

  toggleFavorite(id: number) {
  }
}
