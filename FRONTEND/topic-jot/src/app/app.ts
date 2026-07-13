import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { DialogStateService } from './core/services/dialog-state.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topics, Notes, DialogModule, BaseDialog, LucideAngularModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  public readonly dialogState = inject(DialogStateService);
  private readonly api = inject(ApiService);
  private readonly topicsState = inject(TopicStateService);

  protected readonly TOPIC_ICONS = TOPIC_ICONS;

  view = signal<'Topics' | 'Notes'>('Topics');
  showDialog = signal(false);
  showIconDropdown = signal(false);

  constructor() {
    this.login();
    this.topicsState.getTopics();
  }

  showNotes() {
    this.view.set('Notes');
  }

  showTopics() {
    this.view.set('Topics');
  }

  saveTopic(topic: Topic) {
    console.log(topic);
    if (topic.id) {
      this.api.put<any>(`${TOPIC_ENDPOINTS.updateTopic}/${topic.id}`, topic).subscribe({
        next: () => {
          this.dialogState.closeTopicDialog();
          this.topicsState.getTopics();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      this.api.post<any>(TOPIC_ENDPOINTS.addTopic, topic).subscribe({
        next: () => {
          this.dialogState.closeTopicDialog();
          this.topicsState.getTopics();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
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
}
