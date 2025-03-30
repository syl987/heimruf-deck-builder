import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { EntityContentType } from 'src/app/models/entity.models';

@Component({
  selector: 'hs-entity-wrapper',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: 'display: block' },
})
export class EntityWrapperComponent {
  @Input({ required: true }) contentType!: EntityContentType;

  @Input() set scale(value: NumberInput) {
    this._scale = coerceNumberProperty(value);
  }
  get scale(): number {
    return this._scale;
  }
  private _scale = 0.8;

  @HostBinding('style.transform') get transform(): string {
    return `scale(${this.scale})`;
  }

  @HostBinding('style.margin') get margin(): string {
    const fraction = (1 - this.scale) / 2;

    switch (this.contentType) {
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
