import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topics } from "./features/topics/topics";
import { Notes } from './features/notes/notes';
import { DialogModule } from 'primeng/dialog';
import { BaseDialog } from "./shared/base-dialog/base-dialog";
import { LucideAngularModule } from "lucide-angular";
import { TOPICS } from './core/constants/topics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Topics, Notes, DialogModule, BaseDialog, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly TOPICS = TOPICS;

  view = signal<'Topics' | 'Notes'>('Topics');
  showDialog = signal(false);
  showIconDropdown = signal(false);

  showNotes() {
    this.view.set('Notes');
  }

  showTopics() {
    this.view.set('Topics');
  }
}
