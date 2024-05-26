import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromData from './data.reducer';

export const selectDataState = createFeatureSelector<fromData.State>(fromData.dataFeatureKey);

export const selectDataEntityIds = createSelector(selectDataState, fromData.selectIds);
export const selectDataEntityEntities = createSelector(selectDataState, fromData.selectEntities);
export const selectDataEntities = createSelector(selectDataState, fromData.selectAll);
export const selectDataEntitiesTotal = createSelector(selectDataState, fromData.selectTotal);

export const selectIsDataLoadPending = createSelector(selectDataState, ({ loadPending }) => loadPending);
export const selectDataLoadError = createSelector(selectDataState, ({ loadError }) => loadError);
