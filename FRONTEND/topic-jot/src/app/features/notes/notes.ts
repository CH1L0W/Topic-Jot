import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import type { Delta } from 'quill';
import { NoteCard } from "../../shared/note-card/note-card";
import { LucideAngularModule } from "lucide-angular";
import { SearchBar } from "../../layout/search-bar/search-bar";
import { NoteStateService } from '../../core/services/note-state.service';
import { FormsModule } from "@angular/forms";
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { NgTemplateOutlet } from '@angular/common';
import { QuillEditorDirective } from "../../core/directives/quill-editor.directive";
import { Note } from '../../core/models/note';

@Component({
  selector: 'app-notes',
  imports: [NoteCard, LucideAngularModule, SearchBar, FormsModule, ClickOutsideDirective, NgTemplateOutlet, QuillEditorDirective],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  private readonly notesState = inject(NoteStateService);

  hideOptions = signal(true);
  hideFilters = signal(true);
  hideNoteOptions = signal<number | null>(null);

  filters = signal<Record<string, boolean>>({});

  showNewNoteCard = signal(false);
  editingNoteId = signal<number | null>(null);
  formContent = signal<Delta | null>(null);

  readonly notes = computed(() => this.notesState.notes());

  cancel = () => {
    this.showNewNoteCard.set(false);
    this.editingNoteId.set(null);
    this.formContent.set(null);
  };

  toggle(sig: WritableSignal<boolean>) {
    sig.set(!sig());
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

  toggleNoteOptions(noteId: number) {
    this.hideNoteOptions.set(this.hideNoteOptions() === noteId ? null : noteId);
  }

  closeNoteOptionsIfOpen(id: number) {
    if (this.hideNoteOptions() === id) {
      this.hideNoteOptions.set(null);
    }
  }

  toggleFavorite(id: number) {
    this.notesState.toggleFavorite((id));
  }

  save(note: Note | null) {
    //Update existing note
    if (note) {
      this.notesState.updateNote({ ...note, content: JSON.stringify(this.formContent()) });
      this.cancel();
      return;
    }

    // Create new note
    this.notesState.saveNote(JSON.stringify(this.formContent()));
    this.cancel();
  }

  delete(id: number) {
    this.notesState.deleteNote(id);
    this.cancel();
  }
}
