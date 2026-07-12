import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topics } from "./features/topics/topics";
import { Notes } from './features/notes/notes';
import { DialogModule } from 'primeng/dialog';
import { BaseDialog } from "./shared/base-dialog/base-dialog";
import { LucideAngularModule } from "lucide-angular";
import { TOPIC_ICONS } from './core/constants/topic-icons';
import { ApiService } from './core/services/api.service';
import { TopicStateService } from './core/services/topic-state.service';
import { LOGIN_ENDPOINTS, TOPIC_ENDPOINTS } from './core/constants/endpoints';
import { Topic } from './core/models/topic';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topics, Notes, DialogModule, BaseDialog, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly api = inject(ApiService);
  private readonly topicsState = inject(TopicStateService);
  protected readonly TOPIC_ICONS = TOPIC_ICONS;

  view = signal<'Topics' | 'Notes'>('Topics');
  showDialog = signal(false);
  showIconDropdown = signal(false);

  constructor() {
    this.login();
    this.getTopics();
  }

  showNotes() {
    this.view.set('Notes');
  }

  showTopics() {
    this.view.set('Topics');
  }

  private login() {
    const body = {
      email: 'mario@correo.com',
      password: 'prueba'
    };

    this.api.post<any>(LOGIN_ENDPOINTS.login, body).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private getTopics() {
    this.api.get<Topic[]>(TOPIC_ENDPOINTS.getTopics).subscribe({
      next: (res) => {
        this.topicsState.setTopics = res;
        console.log(this.topicsState.getTopics);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
