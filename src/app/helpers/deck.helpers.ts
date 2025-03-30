import { Dictionary, EntityState } from '@ngrx/entity';

import { entityComparer, mapEntity } from './entity.helpers';
import { Deck, DeckCardCount, DeckIdCount } from '../models/deck.models';
import { CardType, Entity } from '../models/entity.models';

export function toCardCounts(cardIdCounts: DeckIdCount[], entities: Dictionary<Entity>): DeckCardCount[] {
  return cardIdCounts
    .map(({ id, count }) => ({ card: mapEntity(id, entities), count }))
    .filter(isDeckCardDataCount)
    .sort(deckCardDataCountComparer);
}

export function isDeckCardDataCount(count?: { card?: Entity; count: number }): count is DeckCardCount {
  return count?.card?.type === CardType.MINION || count?.card?.type === CardType.SPELL || count?.card?.type === CardType.WEAPON;
}

export function deckCardDataCountComparer(a: DeckCardCount, b: DeckCardCount): number {
  return entityComparer(a.card, b.card);
}

export function getSelectedDeck(state: { selectedHeroId?: string } & EntityState<Deck>): Deck | undefined {
  return state.selectedHeroId ? state.entities[state.selectedHeroId] : undefined;
}
