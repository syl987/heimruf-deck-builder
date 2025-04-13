import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { CardPrerender } from 'src/app/models/prerender.models';

import { PrerenderActions } from './prerender.actions';

export const prerenderFeatureKey = 'prerender';

export interface State extends EntityState<CardPrerender> {}

export const adapter = createEntityAdapter<CardPrerender>({});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(PrerenderActions.initialized, (state, { items }) => adapter.setAll(items, state)),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
