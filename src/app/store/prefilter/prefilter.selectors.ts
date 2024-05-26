import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPrefilter from './prefilter.reducer';

export const selectPrefilterState = createFeatureSelector<fromPrefilter.State>(fromPrefilter.prefilterFeatureKey);

export const selectPrefilterAll = createSelector(selectPrefilterState, fromPrefilter.selectAll);
export const selectPrefilterEntities = createSelector(selectPrefilterState, fromPrefilter.selectEntities);
export const selectPrefilterIds = createSelector(selectPrefilterState, fromPrefilter.selectIds);
export const selectPrefilterTotal = createSelector(selectPrefilterState, fromPrefilter.selectTotal);

export const selectPrefilterHeroIds = createSelector(selectPrefilterState, ({ heroIds }) => heroIds);
