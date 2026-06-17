import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  @Input() title: string = 'Title';
  @Input() description: string = 'Description';
}
