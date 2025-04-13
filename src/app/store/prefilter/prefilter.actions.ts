import { createActionGroup, props } from '@ngrx/store';

import { PrefilteredCardIds } from '../../models/prefilter.models';

export const PrefilterActions = createActionGroup({
  source: 'Prefilter',
  events: {
    'init cards': props<{ ids: string[]; items: PrefilteredCardIds[] }>(),
    'init heroes': props<{ ids: string[] }>(),
  },
});
