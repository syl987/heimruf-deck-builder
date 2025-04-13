import { createActionGroup, props } from '@ngrx/store';

import { CardPrefilter } from '../../models/prefilter.models';

export const PrefilterActions = createActionGroup({
  source: 'Prefilter',
  events: {
    initialized: props<{ items: CardPrefilter[]; cardIds: string[]; heroIds: string[] }>(),
  },
});
