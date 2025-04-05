import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { getSelectedDeck } from 'src/app/helpers/deck.helpers';
import { emptyDeck } from 'src/app/helpers/entity.helpers';
import { Deck } from 'src/app/models/deck.models';
import { SelectionFilter } from 'src/app/models/library.models';

import { DeckBuilderActions } from './deck-builder.actions';
import { createDeckAdapter } from '../adapters/deck.adapter';

export const deckBuilderFeatureKey = 'deck-builder';

export interface State extends EntityState<Deck> {
  filter: SelectionFilter;
  selectedHeroId?: string;
}

const adapter = createEntityAdapter<Deck>({
  selectId: deck => deck.heroId,
});

const deckAdapter = createDeckAdapter();

const initialState: State = adapter.getInitialState({
  filter: SelectionFilter.CLASS,
});

export const reducer = createReducer(
  initialState,
  on(DeckBuilderActions.selectHero, (state, { id }) =>
    adapter.addOne(emptyDeck(id), {
      ...state,
      selectedHeroId: id,
      filter: SelectionFilter.CLASS,
    }),
  ),
  on(DeckBuilderActions.filterCards, (state, { filter }) => ({ ...state, filter })),
  on(DeckBuilderActions.addCardSUCCESS, (state, { card }) => {
    const selectedDeck = getSelectedDeck(state);
    return selectedDeck ? adapter.upsertOne(deckAdapter.addCard(card.id, selectedDeck), state) : state;
  }),
  on(DeckBuilderActions.removeCard, (state, { id }) => {
    const selectedDeck = getSelectedDeck(state);
    return selectedDeck ? adapter.upsertOne(deckAdapter.removeCard(id, selectedDeck), state) : state;
  }),
  on(DeckBuilderActions.removeCards, state => {
    const selectedDeck = getSelectedDeck(state);
    return selectedDeck ? adapter.upsertOne(deckAdapter.removeCards(selectedDeck), state) : state;
  }),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const { getHeroId, getCardIdCounts } = deckAdapter.getSelectors();
