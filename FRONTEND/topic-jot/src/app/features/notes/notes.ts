import { Component, computed, inject } from '@angular/core';
import { NoteCard } from "../../shared/note-card/note-card";
import { LucideAngularModule } from "lucide-angular";
import { SearchBar } from "../../layout/search-bar/search-bar";
import { NoteStateService } from '../../core/services/note-state.service';

@Component({
  selector: 'app-notes',
  imports: [NoteCard, LucideAngularModule, SearchBar],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  private readonly notesState = inject(NoteStateService);

  readonly notes = computed(() => this.notesState.notes());
}
