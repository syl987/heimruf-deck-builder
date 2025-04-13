import { createActionGroup, props } from '@ngrx/store';

import { PrefilteredCardIds } from '../../models/prefilter.models';

export const PrefilterActions = createActionGroup({
  source: 'Prefilter',
  events: {
    'card prefilter initialized': props<{ ids: string[]; items: PrefilteredCardIds[] }>(),
    'hero prefilter initialized': props<{ ids: string[] }>(),
  },
});
