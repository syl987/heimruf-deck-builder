import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (value === null || value === undefined || typeof value !== 'string') {
      return '';
    }
    return this.#sanitizer.bypassSecurityTrustHtml(this.#sanitizer.sanitize(SecurityContext.HTML, value) || '');
  }
}
