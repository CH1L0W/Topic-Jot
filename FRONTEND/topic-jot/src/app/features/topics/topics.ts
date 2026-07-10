import { Component, EventEmitter, Output, signal } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";
import { LucideAngularModule } from 'lucide-angular';
import { SearchBar } from "../../layout/search-bar/search-bar";

@Component({
  selector: 'app-topics',
  imports: [TopicCard, LucideAngularModule, SearchBar],
  templateUrl: './topics.html',
  styleUrl: './topics.css',
})
export class Topics {
  @Output() topicSelected = new EventEmitter<void>();
  @Output() addTopic = new EventEmitter<void>();

  filter = signal<'All' | 'Favorites' | 'Recent' | 'Archived'>('All');

  items = Array(4);

  setTopicsFilter(filter: 'All' | 'Favorites' | 'Recent' | 'Archived') {
    this.filter.set(filter);
  }
}
