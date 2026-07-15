import { inject, Injectable, signal } from '@angular/core';
import { Topic } from '../models/topic';
import { ApiService } from './api.service';
import { TOPIC_ENDPOINTS } from '../constants/endpoints';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicStateService {
  private readonly api = inject(ApiService);
  topics = signal<Topic[]>([]);

  getTopics(filterName?: string, value?: string | number | boolean) {
    this.api.get<Topic[]>(
      TOPIC_ENDPOINTS.getTopics, 
      filterName ? new HttpParams().set(filterName, String(value)) : undefined
    ).subscribe({
      next: (res) => this.topics.set(res),
      error: (err) => console.error(err),
    });
  }

  eraseTopic(id: string) {
    this.api.delete<any>(`${TOPIC_ENDPOINTS.deleteTopic}/${id}`).subscribe({
      next: () => this.getTopics(),
      error: (err) => console.error(err),
    });
  }

  toggleFavorite(id: string) {
    this.api.put<any>(TOPIC_ENDPOINTS.toggleFavorite, {'id': Number (id)}).subscribe({
      next: () => this.getTopics(),
      error: (err) => console.error(err),
    });
  }
}
