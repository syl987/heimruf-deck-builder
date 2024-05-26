import { Deck, DeckIdCount } from 'src/app/models/deck.models';

interface DeckStateAdapter {
  addCard(id: string, deck: Deck): Deck;
  removeCard(id: string, deck: Deck): Deck;
  removeCards(deck: Deck): Deck;
}

export interface DeckAdapter extends DeckStateAdapter {
  getSelectors(): DeckSelectors;
}

interface DeckSelectors {
  getHeroId(deck: Deck): string;
  getCardIdCounts(deck: Deck): DeckIdCount[];
}

class DeckAdapterImpl implements DeckAdapter {
  addCard(id: string, deck: Deck): Deck {
    const alreadyIncluded = deck.cardIdCounts.some(c => c.id === id);

    if (alreadyIncluded) {
      // TODO check for duplicates
      return { ...deck, cardIdCounts: deck.cardIdCounts.map(c => (c.id === id ? { ...c, count: c.count + 1 } : c)) };
    }
    return { ...deck, cardIdCounts: [...deck.cardIdCounts, { id, count: 1 }] };
  }

  removeCard(id: string, deck: Deck): Deck {
    const currentCount = deck.cardIdCounts.find(c => c.id === id)?.count || 0;

    if (currentCount > 1) {
      // TODO check for duplicates
      return { ...deck, cardIdCounts: deck.cardIdCounts.map(c => (c.id === id ? { ...c, count: c.count - 1 } : c)) };
    }
    return { ...deck, cardIdCounts: deck.cardIdCounts.filter(c => c.id !== id) };
  }

  removeCards(deck: Deck): Deck {
    return { ...deck, cardIdCounts: [] };
  }

  getSelectors(): DeckSelectors {
    return {
      getHeroId: (deck: Deck) => deck.heroId,
      getCardIdCounts: (deck: Deck) => deck.cardIdCounts,
    };
  }
}

export function createDeckAdapter(): DeckAdapter {
  return new DeckAdapterImpl();
}
