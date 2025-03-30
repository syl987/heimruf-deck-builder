import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { getStyleUrl } from 'src/app/helpers/style.helpers';
import { CardClass, CardRarity, Weapon } from 'src/app/models/entity.models';

const defaultWeaponTemplate = 'assets/img/template/weapon/neutral-weapon-template.png';
const boardWeaponTemplate = 'assets/img/template/weapon/board-weapon-template.png';

const templates = new Map<CardClass, string>([
  [CardClass.DRUID, 'assets/img/template/weapon/druid-weapon-template.png'],
  [CardClass.HUNTER, 'assets/img/template/weapon/hunter-weapon-template.png'],
  [CardClass.MAGE, 'assets/img/template/weapon/mage-weapon-template.png'],
  [CardClass.PALADIN, 'assets/img/template/weapon/paladin-weapon-template.png'],
  [CardClass.PRIEST, 'assets/img/template/weapon/priest-weapon-template.png'],
  [CardClass.ROGUE, 'assets/img/template/weapon/rogue-weapon-template.png'],
  [CardClass.SHAMAN, 'assets/img/template/weapon/shaman-weapon-template.png'],
  [CardClass.WARLOCK, 'assets/img/template/weapon/warlock-weapon-template.png'],
  [CardClass.WARRIOR, 'assets/img/template/weapon/warrior-weapon-template.png'],
  [CardClass.NEUTRAL, 'assets/img/template/weapon/neutral-weapon-template.png'],
]);

const crystals = new Map<CardRarity, string>([
  [CardRarity.COMMON, 'assets/img/template/weapon/common-weapon-crystal.png'],
  [CardRarity.RARE, 'assets/img/template/weapon/rare-weapon-crystal.png'],
  [CardRarity.EPIC, 'assets/img/template/weapon/epic-weapon-crystal.png'],
  [CardRarity.LEGENDARY, 'assets/img/template/weapon/legendary-weapon-crystal.png'],
]);

@Component({
  selector: 'hs-weapon',
  standalone: false,
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hs-entity hs-weapon' },
})
export class WeaponComponent {
  readonly data = input.required<Weapon>();

  get image256xUrl(): string {
    return `assets/img/hearthstonejson/v1/256x/${this.data().id}.jpg`;
  }

  get templateUrl(): string {
    return templates.get(this.data().cardClass || CardClass.NEUTRAL) ?? defaultWeaponTemplate;
  }

  get rarityCrystalStyleUrl(): string | null {
    const { rarity } = this.data();
    return rarity ? getStyleUrl(crystals.get(rarity)) : null;
  }
}
