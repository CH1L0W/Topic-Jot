import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appAutoGrow]',
})
export class AutoGrowDirective {
  private readonly elementRef = inject(ElementRef<HTMLTextAreaElement>);

  ngAfterViewInit() {
    this.resize();
  }

  @HostListener('input')
  onInput() {
    this.resize();
  }

  private resize() {
    const el = this.elementRef.nativeElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}
