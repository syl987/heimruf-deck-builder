import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Card } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';

export const DeckBuilderActions = createActionGroup({
  source: 'Deck',
  events: {
    'select hero': props<{ id: string }>(),

    'filter cards': props<{ filter: SelectionFilter }>(),

    'add card': props<{ card: Card }>(),
    'add card SUCCESS': props<{ card: Card }>(),
    'add card ERROR': props<{ message: string }>(),

    'remove card': props<{ id: string }>(),
    'remove cards': emptyProps(),

    /* 'save': emptyProps(), */
    /* 'save SUCCESS': emptyProps(), */
    /* 'save ERROR': emptyProps(), */
  },
});
