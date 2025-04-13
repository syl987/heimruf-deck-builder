import { entityComparer, isCard, isHero, isMinion, isSpell, isWeapon } from './entity.helpers';
import { notUndefined } from '../functions/typeguard.functions';
import { CardClass, Entity } from '../models/entity.models';
import { CardPrefilter } from '../models/prefilter.models';

export function createCollectibleCardPrefilter(items: Entity[]): CardPrefilter[] {
  const classes = items
    .map(item => item.cardClass)
    .filter(notUndefined)
    .reduce<CardClass[]>((acc, c) => (!acc.includes(c) ? [...acc, c] : acc), []);

  const collectibleItems = items.filter(item => item.collectible);

  return classes.map(cardClass => ({
    cardClass,
    cardIds: collectibleItems
      .filter(item => item.cardClass === cardClass)
      .filter(isCard)
      .sort(entityComparer)
      .map(item => item.id),
    withNeutral: {
      minionIds: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isMinion)
        .sort(entityComparer)
        .map(item => item.id),
      spellIds: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isSpell)
        .sort(entityComparer)
        .map(item => item.id),
      weaponIds: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isWeapon)
        .sort(entityComparer)
        .map(item => item.id),
      cost0Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 0)
        .sort(entityComparer)
        .map(item => item.id),
      cost1Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 1)
        .sort(entityComparer)
        .map(item => item.id),
      cost2Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 2)
        .sort(entityComparer)
        .map(item => item.id),
      cost3Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 3)
        .sort(entityComparer)
        .map(item => item.id),
      cost4Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 4)
        .sort(entityComparer)
        .map(item => item.id),
      cost5Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 5)
        .sort(entityComparer)
        .map(item => item.id),
      cost6Ids: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost === 6)
        .sort(entityComparer)
        .map(item => item.id),
      cost7plusIds: collectibleItems
        .filter(item => item.cardClass === cardClass || item.cardClass === 'NEUTRAL')
        .filter(isCard)
        .filter(item => item.cost >= 7)
        .sort(entityComparer)
        .map(item => item.id),
    },
  }));
}

export function selectCollectibleCardIds(items: Entity[]): string[] {
  return items
    .filter(item => item.collectible)
    .filter(isCard)
    .sort(entityComparer)
    .map(item => item.id);
}

export function selectCollectibleHeroIds(items: Entity[]): string[] {
  return items
    .filter(item => item.collectible)
    .filter(isHero)
    .sort(entityComparer)
    .map(item => item.id);
}
