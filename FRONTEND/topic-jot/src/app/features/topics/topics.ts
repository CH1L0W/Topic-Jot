import { Component, EventEmitter, Output } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-topics',
  imports: [TopicCard, LucideAngularModule],
  templateUrl: './topics.html',
  styleUrl: './topics.css',
})
export class Topics {
  @Output() topicSelected = new EventEmitter<void>();
  @Output() addTopic = new EventEmitter<void>();

  items = Array(4);
}
