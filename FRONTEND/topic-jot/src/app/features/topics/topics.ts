import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";
import { LucideAngularModule } from 'lucide-angular';
import { SearchBar } from "../../layout/search-bar/search-bar";
import { TopicStateService } from '../../core/services/topic-state.service';
import { Topic } from '../../core/models/topic';
import { DialogStateService } from '../../core/services/dialog-state.service';

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
  protected readonly dialogState = inject(DialogStateService); 
  private readonly topicsState = inject(TopicStateService);

  @Output() topicSelected = new EventEmitter<void>();

  readonly filtersList = FILTERS;
  items = Array(1);

  filter = signal<FILTERS>(FILTERS.all);

  readonly topics = computed(() => this.topicsState.topics())

  setTopicsFilter(filter: FILTERS) {
    this.filter.set(filter);
  }
}
