import { Component, computed, inject, signal } from '@angular/core';
import { NoteCard } from "../../shared/note-card/note-card";
import { LucideAngularModule } from "lucide-angular";
import { SearchBar } from "../../layout/search-bar/search-bar";
import { NoteStateService } from '../../core/services/note-state.service';
import { FormsModule } from "@angular/forms";
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-notes',
  imports: [NoteCard, LucideAngularModule, SearchBar, FormsModule, ClickOutsideDirective],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  private readonly notesState = inject(NoteStateService);

  readonly notes = computed(() => this.notesState.notes());
  hideOptions = signal(true);
  hideFilters = signal(true);
  hideNoteOptions = signal(true);
  filters = signal<Record<string, boolean>>({});

  toggleOptions() {
    this.hideOptions.set(!this.hideOptions());
  }

  toggleFilters() {
    this.hideFilters.set(!this.hideFilters());
  }

  toggleFilter(key: string, value: boolean) {
    const newFilters = { ...this.filters() };

    if (newFilters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    this.filters.set(newFilters);
  }

  toggleNoteOptions() {
    this.hideNoteOptions.set(!this.hideNoteOptions());
  }

  toggleFavorite(id: number) {
    this.notesState.toggleFavorite((id));
  }
}
