import { Component } from '@angular/core';
import { NoteCard } from "../../shared/note-card/note-card";
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-notes',
  imports: [NoteCard, LucideAngularModule],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  items = Array(2);
}
