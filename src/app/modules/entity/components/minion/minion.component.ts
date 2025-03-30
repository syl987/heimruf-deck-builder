import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { getStyleUrl } from 'src/app/helpers/style.helpers';
import { CardClass, CardRarity, Minion } from 'src/app/models/entity.models';
import { SharedModule } from 'src/app/modules/shared/shared.module';

const raceDecoration = 'assets/img/template/minion/race-minion-decoration.png';
const dragonDecoration = 'assets/img/template/minion/dragon-minion-decoration.png';
const defaultMinionTemplate = 'assets/img/template/minion/neutral-minion-template.png';
const boardMinionTemplate = 'assets/img/template/minion/board-minion-template.png';

const templates: Record<CardClass, string> = {
  [CardClass.DRUID]: 'assets/img/template/minion/druid-minion-template.png',
  [CardClass.HUNTER]: 'assets/img/template/minion/hunter-minion-template.png',
  [CardClass.MAGE]: 'assets/img/template/minion/mage-minion-template.png',
  [CardClass.PALADIN]: 'assets/img/template/minion/paladin-minion-template.png',
  [CardClass.PRIEST]: 'assets/img/template/minion/priest-minion-template.png',
  [CardClass.ROGUE]: 'assets/img/template/minion/rogue-minion-template.png',
  [CardClass.SHAMAN]: 'assets/img/template/minion/shaman-minion-template.png',
  [CardClass.WARLOCK]: 'assets/img/template/minion/warlock-minion-template.png',
  [CardClass.WARRIOR]: 'assets/img/template/minion/warrior-minion-template.png',
  [CardClass.NEUTRAL]: 'assets/img/template/minion/neutral-minion-template.png',
};

const crystals: Partial<Record<CardRarity, string>> = {
  [CardRarity.COMMON]: 'assets/img/template/minion/common-minion-crystal.png',
  [CardRarity.RARE]: 'assets/img/template/minion/rare-minion-crystal.png',
  [CardRarity.EPIC]: 'assets/img/template/minion/epic-minion-crystal.png',
  [CardRarity.LEGENDARY]: 'assets/img/template/minion/legendary-minion-crystal.png',
};

@Component({
  selector: 'hs-minion',
  imports: [SharedModule, TitleCasePipe],
  templateUrl: './minion.component.html',
  styleUrl: './minion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-minion' },
})
export class MinionComponent {
  @Input({ required: true }) data!: Minion;

  get image256xUrl(): string {
    return `assets/img/hearthstonejson/v1/256x/${this.data.id}.jpg`;
  }

  get templateUrl(): string {
    return templates[this.data.cardClass || CardClass.NEUTRAL] ?? defaultMinionTemplate;
  }

  get rarityCrystalStyleUrl(): string | null {
    const { rarity } = this.data;
    return rarity ? getStyleUrl(crystals[rarity]) : null;
  }

  get raceDecorationStyleUrl(): string {
    return getStyleUrl(raceDecoration);
  }

  get dragonDecorationStyleUrl(): string {
    return getStyleUrl(dragonDecoration);
  }
}
