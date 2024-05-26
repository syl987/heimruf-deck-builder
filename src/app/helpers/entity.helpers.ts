import { Dictionary } from '@ngrx/entity';
import { Card, CardRarity, CardType, Entity, Hero, Minion, Spell, Weapon } from 'src/app/models/entity.models';

import { Deck } from '../models/deck.models';

export function mapEntity<T>(id: string | undefined, entities: Dictionary<T>): T | undefined {
  return id ? entities[id] : undefined;
}

export function emptyDeck<T>(heroId: string): Deck {
  return { heroId, cardIdCounts: [] };
}

export function isHero(entity?: Entity): entity is Hero {
  if (!entity) {
    return false;
  }
  return entity.type === CardType.HERO;
}

export function isCard(entity?: Entity | null): entity is Card {
  if (!entity) {
    return false;
  }
  return entity.type === CardType.MINION || entity.type === CardType.SPELL || entity.type === CardType.WEAPON;
}

export function isMinion(entity?: Entity | null): entity is Minion {
  if (!entity) {
    return false;
  }
  return entity.type === CardType.MINION;
}

export function isSpell(entity?: Entity | null): entity is Spell {
  if (!entity) {
    return false;
  }
  return entity.type === CardType.SPELL;
}

export function isWeapon(entity?: Entity | null): entity is Weapon {
  if (!entity) {
    return false;
  }
  return entity.type === CardType.WEAPON;
}

export function entityComparer<T extends Entity>(a: T, b: T): number {
  const costDiff = compareNums((a as Card).cost, (b as Card).cost);
  if (costDiff !== 0) {
    return costDiff;
  }
  const rarityDiff = compareCardRarity(a.rarity, b.rarity);
  if (rarityDiff !== 0) {
    return rarityDiff;
  }
  const classDiff = compareStrings(a.cardClass !== 'NEUTRAL' ? a.cardClass : 'zzz', b.cardClass !== 'NEUTRAL' ? b.cardClass : 'zzz');
  if (classDiff !== 0) {
    return classDiff;
  }
  return compareStrings(a.name, b.name);
}

function compareNums(a: number = Number.MIN_SAFE_INTEGER, b: number = Number.MIN_SAFE_INTEGER): number {
  return a - b;
}

function compareStrings(a = 'zzz', b = 'zzz'): number {
  return a.localeCompare(b);
}

function compareCardRarity(a: string = CardRarity.FREE, b: string = CardRarity.FREE): number {
  return getRarityRank(a) - getRarityRank(b);
}

function getRarityRank(rarity: string): number {
  switch (rarity) {
    case CardRarity.FREE:
      return 0;
    case CardRarity.COMMON:
      return 0;
    case CardRarity.RARE:
      return 1;
    case CardRarity.EPIC:
      return 2;
    case CardRarity.LEGENDARY:
      return 3;
    default:
      return 0;
  }
}
