import { Component, Input } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { Topic } from '../../core/models/topic';
import { TOPIC_ICONS } from '../../core/constants/topic-icons';
import { TopicIconPipe } from '../../core/pipes/topic-icon.pipe';
import { ContrastColorPipe } from '../../core/pipes/contrast-color.pipe';
import { TimeAgoPipe } from '../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-topic-card',
  imports: [LucideAngularModule, TopicIconPipe, ContrastColorPipe, TimeAgoPipe],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  @Input() topic?: Topic;
}
