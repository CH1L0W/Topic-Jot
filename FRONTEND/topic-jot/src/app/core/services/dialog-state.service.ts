import { Injectable, signal } from '@angular/core';
import { Topic } from '../models/topic';
import { TOPIC_ICONS } from '../constants/topic-icons';

@Injectable({
  providedIn: 'root',
})
export class DialogStateService {
  protected readonly TOPIC_ICONS = TOPIC_ICONS;

  showTopicDialog = signal(false);
  topic = signal<Topic>(this.makeEmptyTopic());

  openTopicDialog(topic?: Topic) {
    this.topic.set(topic ?? this.makeEmptyTopic());
    this.showTopicDialog.set(true);
  }

  closeTopicDialog() {
    this.topic.set(this.makeEmptyTopic());
    this.showTopicDialog.set(false);
  }

  private makeEmptyTopic(): Topic {
    return {
      title: '',
      description: '',
      cardColor: '#D7BDA6',
      icon: this.TOPIC_ICONS[0].icon,
      favorite: false,
      erased: false
    };
  }
}
