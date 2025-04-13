import { createActionGroup, props } from '@ngrx/store';

import { CardPrerender } from 'src/app/models/prerender.models';

export const PrerenderActions = createActionGroup({
  source: 'Prerender',
  events: {
    initialized: props<{ items: CardPrerender[] }>(),
  },
});
