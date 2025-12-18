import { inject } from '@angular/core';
import { deepComputed, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { Store } from '@ngrx/store';

import { Card } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';
import { selectPrefilteredHeroes } from 'src/app/store/prefilter/prefilter.selectors';

import { DeckBuilderActions } from './deck-builder.actions';
import {
  selectSelectedDeckCardCounts,
  selectSelectedDeckCardsTotal,
  selectSelectedDeckEmpty,
  selectSelectedHero,
  selectSelectedHeroId,
  selectSelectionCards,
  selectSelectionFilter,
} from './deck-builder.selectors';

/**
 * Facade store for the Deck Builder module.
 *
 * Does not contain any state itself, only computed signals and methods.
 */
export const DeckBuilderStore = signalStore(
  { providedIn: 'root' },
  withComputed(() => ({
    cards: (store = inject(Store)) => store.selectSignal(selectSelectionCards),
    heroes: (store = inject(Store)) => store.selectSignal(selectPrefilteredHeroes),

    filter: (store = inject(Store)) => store.selectSignal(selectSelectionFilter),

    selectedHero: deepComputed(() => ({
      id: (store = inject(Store)) => store.selectSignal(selectSelectedHeroId),
      hero: (store = inject(Store)) => store.selectSignal(selectSelectedHero),
    })),
    deck: deepComputed(() => ({
      cardCounts: (store = inject(Store)) => store.selectSignal(selectSelectedDeckCardCounts),
      cardsTotal: (store = inject(Store)) => store.selectSignal(selectSelectedDeckCardsTotal),
      empty: (store = inject(Store)) => store.selectSignal(selectSelectedDeckEmpty),
    })),
  })),
  withMethods((_, store = inject(Store)) => ({
    selectHero(heroId: string): void {
      store.dispatch(DeckBuilderActions.selectHero({ id: heroId }));
    },
    filterCards(filter: SelectionFilter): void {
      store.dispatch(DeckBuilderActions.filterCards({ filter }));
    },
    addCard(card: Card): void {
      store.dispatch(DeckBuilderActions.addCard({ card }));
    },
    removeCard(id: string): void {
      store.dispatch(DeckBuilderActions.removeCard({ id }));
    },
    removeCards(): void {
      store.dispatch(DeckBuilderActions.removeCards());
    },
  })),
);
