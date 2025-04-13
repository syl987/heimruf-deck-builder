import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { DataActions } from './data.actions';
import { Entity } from '../../models/entity.models';

export const dataFeatureKey = 'data';

export interface State extends EntityState<Entity> {
  loading: boolean;
  loaded: boolean;
}

const adapter = createEntityAdapter<Entity>({
  selectId: ({ id }) => id,
});

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const reducer = createReducer(
  initialState,
  on(DataActions.load, state => ({
    ...state,
    loading: true,
  })),
  on(DataActions.loadSUCCESS, (state, { cardData }) =>
    adapter.upsertMany(cardData, {
      ...state,
      loading: false,
      loaded: true,
    }),
  ),
  on(DataActions.loadERROR, state => ({
    ...state,
    loading: false,
  })),
);

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
