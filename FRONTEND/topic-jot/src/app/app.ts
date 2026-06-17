import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from "./layout/search-bar/search-bar";
import { Topics } from "./features/topics/topics";
import { Notes } from './features/notes/notes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, Topics, Notes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  view = signal<'Topics' | 'Notes'>('Topics');

  showNotes() {
    this.view.set('Notes');
  }
}
