import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { PrerenderActions } from './prerender.actions';
import { CardPrerender } from 'src/app/models/prerender.models';

export const prerenderFeatureKey = 'prerender';

export interface State extends EntityState<CardPrerender> {}

export const adapter = createEntityAdapter<CardPrerender>({});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(PrerenderActions.initialized, (state, { items }) => adapter.setAll(items, state)),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
