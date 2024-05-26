import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Entity } from 'src/app/models/entity.models';

export const DataActions = createActionGroup({
  source: 'Data',
  events: {
    'load': emptyProps(),
    'load SUCCESS': props<{ entities: Entity[] }>(),
    'load ERROR': emptyProps(),
  },
});
