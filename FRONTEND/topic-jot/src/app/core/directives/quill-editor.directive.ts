import { Directive, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Quill, { Delta } from 'quill';

@Directive({
  selector: '[appQuillEditor]',
})
export class QuillEditorDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private quill: Quill | null = null;

  @Input() readOnly = false;
  @Input() content = "";
  @Output() contentChange = new EventEmitter<Delta>();


  ngOnInit() {
    this.quill = new Quill(this.elementRef.nativeElement, {
      theme: 'snow',
      readOnly: this.readOnly,
      modules: {
        toolbar: this.readOnly ? false : [
          [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'sub' }, { script: 'super' }],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          // ['link', 'image', 'video'],
          ['clean']
        ]
      }
    });

    if (this.content) {
      this.quill.setContents(JSON.parse(this.content));
    }
    this.formatAlignment();

    this.quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        this.formatAlignment();
        this.contentChange.emit(this.quill!.getContents());
      }
    });
  }

  private formatAlignment() {
    const text = this.quill!.getText();
    const firstLineEnd = text.indexOf('\n');
    const bodyStart = firstLineEnd === -1 ? text.length : firstLineEnd + 1;

    this.quill!.formatLine(0, 1, 'align', 'center', 'silent');
    if (bodyStart < this.quill!.getLength()) {
      this.quill!.formatLine(bodyStart, this.quill!.getLength() - bodyStart, 'align', 'justify', 'silent');
    }
  }

  ngOnDestroy() {
    this.quill = null;
  }
}
