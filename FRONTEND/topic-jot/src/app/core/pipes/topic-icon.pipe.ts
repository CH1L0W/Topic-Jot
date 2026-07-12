import { Pipe, PipeTransform } from '@angular/core';
import { TOPIC_ICONS } from '../constants/topic-icons';

@Pipe({
  name: 'topicIcon',
})
export class TopicIconPipe implements PipeTransform {

  transform(name: string): string {
    return TOPIC_ICONS.find(t => t.name === name)?.icon || 'notepad-text';
  }
  
}
