import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPrerender from './prerender.reducer';

export const selectPrerenderState = createFeatureSelector<fromPrerender.State>(fromPrerender.prerenderFeatureKey);

export const selectCardPrerenderIds = createSelector(selectPrerenderState, fromPrerender.selectIds);
export const selectCardPrerenderEntities = createSelector(selectPrerenderState, fromPrerender.selectEntities);
export const selectCardPrerenders = createSelector(selectPrerenderState, fromPrerender.selectAll);
export const selectCardPrerendersTotal = createSelector(selectPrerenderState, fromPrerender.selectTotal);
