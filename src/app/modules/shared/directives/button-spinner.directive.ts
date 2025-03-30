import { ComponentFactoryResolver, Directive, ElementRef, Input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector:
    '[mat-button][spinning],[mat-raised-button][spinning],[mat-stroked-button][spinning],[mat-flat-button][spinning],[mat-icon-button][spinning],[mat-fab][spinning],[mat-mini-fab][spinning]',
  host: { class: 'ib-button-spinner' },
})
export class ButtonSpinnerDirective implements OnInit {
  private readonly spinnerFactory = this._componentFactoryResolver.resolveComponentFactory(MatProgressSpinner);
  private readonly spinnerRef = this._viewContainerRef.createComponent(this.spinnerFactory);

  @Input() set spinning(value: boolean) {
    if (value) {
      this._elementRef.nativeElement.classList.add('spinning');
    } else {
      this._elementRef.nativeElement.classList.remove('spinning');
    }
  }

  @Input() set color(value: string | null | undefined) {
    this.spinnerRef.instance.color = value;
  }
  get color(): string | null | undefined {
    return this.spinnerRef.instance.color;
  }

  @Input() set strokeWidth(value: number) {
    this.spinnerRef.instance.strokeWidth = value;
  }
  get strokeWidth(): number {
    return this.spinnerRef.instance.strokeWidth;
  }

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    private readonly _viewContainerRef: ViewContainerRef,
    private readonly _renderer2: Renderer2,
  ) {
    this.spinnerRef.instance.diameter = 20; // dependent on style positioning
  }

  ngOnInit(): void {
    this._renderer2.appendChild(this._elementRef.nativeElement, this.spinnerRef.instance._elementRef.nativeElement);
  }
}
