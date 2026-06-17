import { Component, EventEmitter, Output } from '@angular/core';
import { TopicCard } from "../../shared/topic-card/topic-card";

@Component({
  selector: 'app-topics',
  imports: [TopicCard],
  templateUrl: './topics.html',
  styleUrl: './topics.css',
})
export class Topics {
  @Output() topicSelected = new EventEmitter<void>();

  items = Array(3);
}
