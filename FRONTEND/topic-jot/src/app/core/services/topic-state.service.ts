import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicStateService {
  topics = signal<any[]>([]);

  set setTopics(topics: any[]) {
    this.topics.set(topics);
  }

  get getTopics(): any[] {
    return this.topics();
  }
}
