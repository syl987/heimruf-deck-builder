import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { PrefilterActions } from './prefilter.actions';
import { PrefilteredCardIds } from '../../models/prefilter.models';

export const PAGE_SIZE = 10;

export const prefilterFeatureKey = 'prefilter';

export interface State extends EntityState<PrefilteredCardIds> {
  cardIds: string[];
  heroIds: string[];
}

const adapter = createEntityAdapter<PrefilteredCardIds>({
  selectId: item => item.cardClass,
});

const initialState: State = adapter.getInitialState({
  cardIds: [],
  heroIds: [],
});

export const reducer = createReducer(
  initialState,
  on(PrefilterActions.initialized, (state, { cardIds, heroIds, items }) => ({ ...adapter.setAll(items, state), cardIds, heroIds })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
