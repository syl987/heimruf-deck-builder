import { createSelector } from '@ngrx/store';

import { notUndefined } from 'src/app/functions/typeguard.functions';
import { isCard } from 'src/app/helpers/entity.helpers';
import { selectDataEntities } from 'src/app/store/data/data.selectors';
import { selectCardPrefilterEntities } from 'src/app/store/prefilter/prefilter.selectors';
import { selectCardPrerenderEntities } from 'src/app/store/prerender/prerender.selectors';
import { selectRouterRouteParam } from 'src/app/store/router/router.selectors';

export const selectLibraryCardIds = createSelector(selectCardPrefilterEntities, selectRouterRouteParam('cardClass'), (entities, param) => {
  return param ? (entities[param.toUpperCase()]?.cardIds ?? []) : [];
});

export const selectLibraryCards = createSelector(selectLibraryCardIds, selectDataEntities, (ids, entities) => {
  return ids
    .map(id => entities[id])
    .filter(notUndefined)
    .filter(isCard);
});

export const selectLibraryCardComponents = createSelector(selectLibraryCardIds, selectCardPrerenderEntities, (ids, entities) => {
  return ids.map(id => entities[id]?.cardComponentRef).filter(notUndefined);
});
