import { Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";
import { LucideAngularModule } from 'lucide-angular';
import { SearchBar } from "../../layout/search-bar/search-bar";
import { TopicStateService } from '../../core/services/topic-state.service';

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
  private readonly topicsState = inject(TopicStateService);

  @Output() topicSelected = new EventEmitter<void>();
  @Output() addTopic = new EventEmitter<void>();

  readonly filtersList = FILTERS;
  items = Array(1);

  filter = signal<FILTERS>(FILTERS.all);

  readonly topics = computed(() => this.topicsState.getTopics)

  setTopicsFilter(filter: FILTERS) {
    this.filter.set(filter);
  }
}
