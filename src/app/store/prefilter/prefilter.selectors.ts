import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromPrefilter from './prefilter.reducer';
import { selectDataEntities } from '../data/data.selectors';
import { notUndefined } from 'src/app/functions/typeguard.functions';
import { isCard, isHero } from 'src/app/helpers/entity.helpers';

export const selectPrefilterState = createFeatureSelector<fromPrefilter.State>(fromPrefilter.prefilterFeatureKey);

export const selectPrefilterIds = createSelector(selectPrefilterState, fromPrefilter.selectIds);
export const selectPrefilterEntities = createSelector(selectPrefilterState, fromPrefilter.selectEntities);
export const selectPrefilters = createSelector(selectPrefilterState, fromPrefilter.selectAll);
export const selectPrefiltersTotal = createSelector(selectPrefilterState, fromPrefilter.selectTotal);

export const selectPrefilterCardIds = createSelector(selectPrefilterState, ({ cardIds }) => cardIds);
export const selectPrefilterHeroIds = createSelector(selectPrefilterState, ({ heroIds }) => heroIds);

export const selectPrefilteredCards = createSelector(selectPrefilterCardIds, selectDataEntities, (ids, entities) =>
  ids
    .map(id => entities[id])
    .filter(notUndefined)
    .filter(isCard),
);

export const selectPrefilteredHeroes = createSelector(selectPrefilterHeroIds, selectDataEntities, (ids, entities) =>
  ids
    .map(id => entities[id])
    .filter(notUndefined)
    .filter(isHero),
);
