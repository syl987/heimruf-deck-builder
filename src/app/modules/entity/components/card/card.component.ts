import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card, CardRarity } from 'src/app/models/entity.models';

const cardTemplate = 'assets/img/template/selection-card-template.png';

@Component({
  selector: 'hs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-card' },
})
export class CardComponent {
  readonly data = input.required<Card>();
  readonly count = input.required<number>();

  get imageTileUrl(): string {
    return `assets/img/hearthstonejson/v1/tile/${this.data().id}.jpg`;
  }

  readonly templateUrl = cardTemplate;

  readonly CardRarity = CardRarity;
}
