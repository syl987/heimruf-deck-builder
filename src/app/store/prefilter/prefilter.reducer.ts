import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { PrefilteredCardIds } from '../../models/prefilter.models';
import { PrefilterActions } from './prefilter.actions';

export const PAGE_SIZE = 10;

export const prefilterFeatureKey = 'prefilter';

export interface State extends EntityState<PrefilteredCardIds> {
  heroIds: string[];
}

const cardAdapter = createEntityAdapter<PrefilteredCardIds>({
  selectId: item => item.cardClass,
});

const initialState: State = cardAdapter.getInitialState({
  heroIds: [],
});

export const reducer = createReducer(
  initialState,
  on(PrefilterActions.initCards, (state, { items }) => cardAdapter.setAll(items, state)),
  on(PrefilterActions.initHeroes, (state, { ids }) => ({ ...state, heroIds: ids })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = cardAdapter.getSelectors();
