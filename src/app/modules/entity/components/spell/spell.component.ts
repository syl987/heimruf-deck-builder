import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { getStyleUrl } from 'src/app/helpers/style.helpers';
import { CardClass, CardRarity, Spell } from 'src/app/models/entity.models';

const defaultSpellTemplate = 'assets/img/template/spell/neutral-spell-template.png';

const templates: ReadonlyMap<CardClass, string> = new Map([
  [CardClass.DRUID, 'assets/img/template/spell/druid-spell-template.png'],
  [CardClass.HUNTER, 'assets/img/template/spell/hunter-spell-template.png'],
  [CardClass.MAGE, 'assets/img/template/spell/mage-spell-template.png'],
  [CardClass.PALADIN, 'assets/img/template/spell/paladin-spell-template.png'],
  [CardClass.PRIEST, 'assets/img/template/spell/priest-spell-template.png'],
  [CardClass.ROGUE, 'assets/img/template/spell/rogue-spell-template.png'],
  [CardClass.SHAMAN, 'assets/img/template/spell/shaman-spell-template.png'],
  [CardClass.WARLOCK, 'assets/img/template/spell/warlock-spell-template.png'],
  [CardClass.WARRIOR, 'assets/img/template/spell/warrior-spell-template.png'],
  [CardClass.NEUTRAL, 'assets/img/template/spell/neutral-spell-template.png'],
]);

const crystals: ReadonlyMap<CardRarity, string> = new Map([
  [CardRarity.COMMON, 'assets/img/template/spell/common-spell-crystal.png'],
  [CardRarity.RARE, 'assets/img/template/spell/rare-spell-crystal.png'],
  [CardRarity.EPIC, 'assets/img/template/spell/epic-spell-crystal.png'],
  [CardRarity.LEGENDARY, 'assets/img/template/spell/legendary-spell-crystal.png'],
]);

@Component({
  selector: 'hs-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-spell' },
})
export class SpellComponent {
  readonly data = input.required<Spell>();

  get image256xUrl(): string {
    return `assets/img/hearthstonejson/v1/256x/${this.data().id}.jpg`;
  }

  get templateUrl(): string {
    return templates.get(this.data().cardClass || CardClass.NEUTRAL) ?? defaultSpellTemplate;
  }

  get rarityCrystalStyleUrl(): string | null {
    const rarity = this.data().rarity;
    return rarity ? getStyleUrl(crystals.get(rarity)) : null;
  }
}
