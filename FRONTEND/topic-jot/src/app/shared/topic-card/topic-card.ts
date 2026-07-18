import { Component, inject, Input, signal } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { Topic } from '../../core/models/topic';
import { TopicIconPipe } from '../../core/pipes/topic-icon.pipe';
import { ContrastColorPipe } from '../../core/pipes/contrast-color.pipe';
import { TimeAgoPipe } from '../../core/pipes/time-ago.pipe';
import { DialogStateService } from '../../core/services/dialog-state.service';
import { TopicStateService } from '../../core/services/topic-state.service';

@Component({
  selector: 'app-topic-card',
  imports: [LucideAngularModule, TopicIconPipe, ContrastColorPipe, TimeAgoPipe],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  readonly dialogState = inject(DialogStateService);
  private readonly topicsState = inject(TopicStateService);

  @Input() topic?: Topic;
  hideOptions = signal(true);

  toggleOptions() {
    this.hideOptions.set(!this.hideOptions());
  }

  editTopic() {
    this.dialogState.openTopicDialog(this.topic);
    this.hideOptions.set(true);
  }

  eraseTopic() {
    if (this.topic?.id) {
      this.topicsState.eraseTopic(this.topic.id);
    }

    this.hideOptions.set(true);
  }

  toggleFavorite(id: number) {
    this.topicsState.toggleFavorite((id));
  }
}
