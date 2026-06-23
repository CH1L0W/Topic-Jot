import { Component } from '@angular/core';
import { NoteCard } from "../../shared/note-card/note-card";

@Component({
  selector: 'app-notes',
  imports: [NoteCard],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  items = Array(2);
}
