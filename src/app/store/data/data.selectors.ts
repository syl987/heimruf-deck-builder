import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromData from './data.reducer';

export const selectDataState = createFeatureSelector<fromData.State>(fromData.dataFeatureKey);

export const selectDataIds = createSelector(selectDataState, fromData.selectIds);
export const selectDataEntities = createSelector(selectDataState, fromData.selectEntities);
export const selectData = createSelector(selectDataState, fromData.selectAll);
export const selectDataTotal = createSelector(selectDataState, fromData.selectTotal);

export const selectDataLoading = createSelector(selectDataState, ({ loading }) => loading);
export const selectDataLoadError = createSelector(selectDataState, ({ loadError }) => loadError);
