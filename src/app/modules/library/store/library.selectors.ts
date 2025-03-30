import { createSelector } from '@ngrx/store';
import { notUndefined } from 'src/app/functions/typeguard.functions';
import { isCard } from 'src/app/helpers/entity.helpers';
import { selectDataEntityEntities } from 'src/app/store/data/data.selectors';
import { selectPrefilterEntities } from 'src/app/store/prefilter/prefilter.selectors';
import { selectRouterParam } from 'src/app/store/router/router.selectors';

export const selectLibraryCardIds = createSelector(selectPrefilterEntities, selectRouterParam('cardClass'), (entities, param) => {
  return param ? (entities[param.toUpperCase()]?.cardIds ?? []) : [];
});

export const selectLibraryCards = createSelector(selectDataEntityEntities, selectLibraryCardIds, (entities, ids) => {
  return ids
    .map(id => entities[id])
    .filter(notUndefined)
    .filter(isCard);
});
