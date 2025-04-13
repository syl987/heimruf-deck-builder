import { createActionGroup, props } from '@ngrx/store';

import { PrefilteredCardIds } from '../../models/prefilter.models';

export const PrefilterActions = createActionGroup({
  source: 'Prefilter',
  events: {
    initialized: props<{ cardIds: string[]; heroIds: string[]; items: PrefilteredCardIds[] }>(),
  },
});
