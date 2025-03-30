import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Entity } from '../../models/entity.models';

export const DataActions = createActionGroup({
  source: 'Data',
  events: {
    'load': emptyProps(),
    'load SUCCESS': props<{ cardData: Entity[] }>(),
    'load ERROR': emptyProps(),
  },
});
