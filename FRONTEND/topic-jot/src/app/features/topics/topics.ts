import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";
import { LucideAngularModule } from 'lucide-angular';
import { SearchBar } from "../../layout/search-bar/search-bar";
import { TopicStateService } from '../../core/services/topic-state.service';
import { Topic } from '../../core/models/topic';
import { DialogStateService } from '../../core/services/dialog-state.service';
import { NoteStateService } from '../../core/services/note-state.service';

export enum FILTERS {
  all = 'ALL',
  favorites = 'FAVORITES',
  recent = 'RECENT',
  archived = 'ARCHIVED'
}

@Component({
  selector: 'app-topics',
  imports: [TopicCard, LucideAngularModule, SearchBar],
  templateUrl: './topics.html',
  styleUrl: './topics.css',
})
export class Topics {
  readonly dialogState = inject(DialogStateService); 
  private readonly topicsState = inject(TopicStateService);
  private readonly notesState = inject(NoteStateService);

  @Output() topicSelected = new EventEmitter<void>();

  readonly filtersList = FILTERS;

  filter = signal<FILTERS>(FILTERS.all);

  readonly topics = computed(() => this.topicsState.topics())
  
  setTopicsFilter(filter: FILTERS) {
    switch (filter) {
      case FILTERS.all:
        this.topicsState.getTopics();
        break;
      case FILTERS.favorites:
        this.topicsState.getTopics('favorite', true);
        break;
      case FILTERS.recent:
        this.topicsState.getTopics('recent', true);
        break;
      case FILTERS.archived:
        this.topicsState.getTopics('erased', true);
        break;
    }

    this.filter.set(filter);
  }

  searchNotes(topicId: number) {
    this.notesState.searchNotes(topicId);
    this.topicSelected.emit();
  }
}
