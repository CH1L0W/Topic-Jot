import { Component, Input } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-topic-card',
  imports: [LucideAngularModule],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  @Input() title?: string;
  @Input() description?: string;
}
