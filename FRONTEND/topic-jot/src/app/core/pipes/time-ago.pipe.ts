import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {

  transform(lastTimeOpened?: Date): string {
    if (!lastTimeOpened) return 'never';

    const opened = new Date(lastTimeOpened);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - opened.getTime()) / 1000 / 60 / 60 / 24);

    if (diffInDays <= 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    return `${diffInDays} days ago`;
  }

}
