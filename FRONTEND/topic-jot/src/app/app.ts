import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from "./layout/search-bar/search-bar";
import { Topics } from "./features/topics/topics";
import { Notes } from './features/notes/notes';
import { DialogModule } from 'primeng/dialog';
import { BaseDialog } from "./shared/base-dialog/base-dialog";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, Topics, Notes, DialogModule, BaseDialog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  view = signal<'Topics' | 'Notes'>('Topics');
  showDialog = signal(false);

  showNotes() {
    this.view.set('Notes');
  }

  showTopics() {
    this.view.set('Topics');
  }
}
