import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { DataActions } from './data.actions';
import { Entity } from '../../models/entity.models';

export const dataFeatureKey = 'data';

export interface State extends EntityState<Entity> {
  loadPending: boolean;
  loadError?: boolean;
}

const adapter = createEntityAdapter<Entity>({
  selectId: ({ id }) => id,
});

const initialState: State = adapter.getInitialState({
  loadPending: false,
});

export const reducer = createReducer(
  initialState,
  on(DataActions.load, state => ({
    ...state,
    loadPending: true,
    loadError: undefined,
  })),
  on(DataActions.loadSUCCESS, (state, { cardData }) =>
    adapter.upsertMany(cardData, {
      ...state,
      loadPending: false,
      loadError: undefined,
    }),
  ),
  on(DataActions.loadERROR, state => ({
    ...state,
    loadPending: false,
    loadError: true,
  })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
