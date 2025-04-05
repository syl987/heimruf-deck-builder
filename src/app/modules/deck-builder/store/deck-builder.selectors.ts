import { createFeatureSelector, createSelector } from '@ngrx/store';

import { notUndefined } from 'src/app/functions/typeguard.functions';
import { toCardCounts } from 'src/app/helpers/deck.helpers';
import { isCard, isHero, mapEntity } from 'src/app/helpers/entity.helpers';
import { CardClass } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';
import { selectDataEntityEntities } from 'src/app/store/data/data.selectors';
import { selectPrefilterEntities, selectPrefilterHeroIds } from 'src/app/store/prefilter/prefilter.selectors';

import * as fromDeckBuilder from './deck-builder.reducer';

export const selectDeckBuilderState = createFeatureSelector<fromDeckBuilder.State>(fromDeckBuilder.deckBuilderFeatureKey);

export const selectDeckAll = createSelector(selectDeckBuilderState, fromDeckBuilder.selectAll);
export const selectDeckEntities = createSelector(selectDeckBuilderState, fromDeckBuilder.selectEntities);
export const selectDeckIds = createSelector(selectDeckBuilderState, fromDeckBuilder.selectIds);
export const selectDeckTotal = createSelector(selectDeckBuilderState, fromDeckBuilder.selectTotal);

export const selectSelectedHeroId = createSelector(selectDeckBuilderState, ({ selectedHeroId }) => selectedHeroId);
export const selectSelectedHero = createSelector(selectSelectedHeroId, selectDataEntityEntities, mapEntity);

export const selectSelectedDeck = createSelector(selectSelectedHero, selectDeckEntities, (hero, entities) => mapEntity(hero?.id, entities));
export const selectSelectedDeckCardIdCounts = createSelector(selectSelectedDeck, deck => (deck ? fromDeckBuilder.getCardIdCounts(deck) : []));
export const selectSelectedDeckCardCounts = createSelector(selectSelectedDeckCardIdCounts, selectDataEntityEntities, toCardCounts);
export const selectSelectedDeckCardsTotal = createSelector(selectSelectedDeckCardIdCounts, counts => counts.reduce((acc, c) => acc + c.count, 0));
export const selectSelectedDeckEmpty = createSelector(selectSelectedDeckCardIdCounts, ({ length }) => !length);

export const selectSelectionFilter = createSelector(selectDeckBuilderState, ({ filter }) => filter);

export const selectSelectionHeroes = createSelector(selectPrefilterHeroIds, selectDataEntityEntities, (ids, entities) =>
  ids
    .map(id => mapEntity(id, entities))
    .filter(notUndefined)
    .filter(isHero),
);

export const selectSelectionCardIds = createSelector(selectSelectionFilter, selectSelectedHero, selectPrefilterEntities, (filter, hero, prefilteredIds): string[] => {
  if (!hero?.cardClass) {
    return [];
  }
  switch (filter) {
    case SelectionFilter.CLASS:
      return prefilteredIds[hero?.cardClass]?.cardIds ?? [];
    case SelectionFilter.NEUTRAL:
      return prefilteredIds[CardClass.NEUTRAL]?.cardIds ?? [];
    case SelectionFilter.MINION:
      return prefilteredIds[hero?.cardClass]?.withNeutral.minionIds ?? [];
    case SelectionFilter.SPELL:
      return prefilteredIds[hero?.cardClass]?.withNeutral.spellIds ?? [];
    case SelectionFilter.WEAPON:
      return prefilteredIds[hero?.cardClass]?.withNeutral.weaponIds ?? [];
    case SelectionFilter.COST_0:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost0Ids ?? [];
    case SelectionFilter.COST_1:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost1Ids ?? [];
    case SelectionFilter.COST_2:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost2Ids ?? [];
    case SelectionFilter.COST_3:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost3Ids ?? [];
    case SelectionFilter.COST_4:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost4Ids ?? [];
    case SelectionFilter.COST_5:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost5Ids ?? [];
    case SelectionFilter.COST_6:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost6Ids ?? [];
    case SelectionFilter.COST_7_PLUS:
      return prefilteredIds[hero?.cardClass]?.withNeutral.cost7plusIds ?? [];
    default:
      return [];
  }
});

export const selectSelectionCards = createSelector(selectSelectionCardIds, selectDataEntityEntities, (ids, entities) =>
  ids
    .map(id => mapEntity(id, entities))
    .filter(notUndefined)
    .filter(isCard),
);
