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
  @Output() addTopic = new EventEmitter<void>();

  items = Array(4);

  addTopicClick() {
    console.log('click addTopic');
    this.addTopic.emit();
  }
}
