import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, input, NgZone, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { EntityContentType } from 'src/app/models/entity.models';

function getEntityButtonRippleClass(contentType: EntityContentType): string {
  switch (contentType) {
    case 'card':
      return 'hs-card-button-ripple';
    case 'hero':
      return 'hs-hero-button-ripple';
    case 'tile':
      return 'hs-tile-button-ripple';
    default:
      throw new Error('EntityButton.contentType not recognized.');
  }
}

@Component({
  selector: 'button[hs-entity-button], button[hsEntityButton], a[hs-entity-button], a[hsEntityButton]',
  exportAs: 'hsEntityButton',
  standalone: false,
  inputs: ['disabled', 'disableRipple'],
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
    '[class.hs-entity-button]': 'true',
  },
  templateUrl: './entity-button.component.html',
  styleUrl: './entity-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EntityButtonComponent extends MatButton implements OnInit {
  readonly contentType = input.required<EntityContentType>();

  readonly scale = input<number, NumberInput>(0.8, { transform: coerceNumberProperty });

  constructor(el: ElementRef, platform: Platform, zone: NgZone, @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode: string) {
    super(el, platform, zone, animationMode);
  }

  ngOnInit(): void {
    this._rippleLoader?.configureRipple(this._elementRef.nativeElement, {
      className: getEntityButtonRippleClass(this.contentType()),
    });
  }
}
