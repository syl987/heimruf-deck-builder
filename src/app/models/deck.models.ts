import { Card } from './entity.models';

export interface Deck {
  heroId: string;
  cardIdCounts: DeckIdCount[];
}

export interface DeckIdCount {
  id: string;
  count: number;
}

export interface DeckCardCount {
  card: Card;
  count: number;
}
