import { Component } from '@angular/core';
import { NoteCard } from "../../shared/note-card/note-card";
import { LucideAngularModule } from "lucide-angular";
import { SearchBar } from "../../layout/search-bar/search-bar";

@Component({
  selector: 'app-notes',
  imports: [NoteCard, LucideAngularModule, SearchBar],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
})
export class Notes {
  items = Array(2);
}
