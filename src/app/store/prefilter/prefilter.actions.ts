import { createActionGroup, props } from '@ngrx/store';

import { PrefilteredCardIds } from '../../models/prefilter.models';

export const PrefilterActions = createActionGroup({
  source: 'Prefilter',
  events: {
    'init cards': props<{ items: PrefilteredCardIds[] }>(),
    'init heroes': props<{ ids: string[] }>(),
  },
});
