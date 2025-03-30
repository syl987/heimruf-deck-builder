import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Card, CardRarity } from 'src/app/models/entity.models';

const cardTemplate = 'assets/img/template/selection-card-template.png';

@Component({
  selector: 'hs-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-card' },
})
export class CardComponent {
  @Input({ required: true }) data!: Card;
  @Input({ required: true }) count!: number;

  get imageTileUrl(): string {
    return `assets/img/hearthstonejson/v1/tile/${this.data.id}.jpg`;
  }

  readonly templateUrl = cardTemplate;

  readonly CardRarity = CardRarity;
}
