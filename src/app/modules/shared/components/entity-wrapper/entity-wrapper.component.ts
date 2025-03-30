import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

import { EntityContentType } from 'src/app/models/entity.models';

@Component({
  selector: 'hs-entity-wrapper',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: block' },
})
export class EntityWrapperComponent {
  readonly contentType = input.required<EntityContentType>();

  readonly scale = input<number, NumberInput>(0.8, { transform: coerceNumberProperty });

  @HostBinding('style.transform') get transform(): string {
    return `scale(${this.scale()})`;
  }

  @HostBinding('style.margin') get margin(): string {
    const fraction = (1 - this.scale()) / 2;

    switch (this.contentType()) {
      case 'card':
        return `${-fraction * 386}px ${-fraction * 286}px`;
      case 'hero':
        return `${-fraction * 386}px ${-fraction * 286}px`;
      case 'tile':
        return `${-fraction * 43}px ${-fraction * 286}px`;
      default:
        throw new Error('ContentType not recognized.');
    }
  }
}
