import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CardRarity } from 'src/app/models/entity.models';
import { ToastActions } from 'src/app/store/toast/toast.actions';

import { DeckBuilderActions } from './deck-builder.actions';
import { selectSelectedDeck } from './deck-builder.selectors';

const MAX_CARD_COPIES = 2;
const MAX_CARDS = 30;

@Injectable()
export class DeckBuilderEffects {
  readonly add = createEffect(() => {
    return this.actions.pipe(
      ofType(DeckBuilderActions.addCard),
      concatLatestFrom(() => this.store.select(selectSelectedDeck)),
      map(([{ card }, deck]) => {
        if (deck == null) {
          return DeckBuilderActions.addCardERROR({ message: `Internal Error.` });
        }
        const count = deck.cardIdCounts.find(c => c.id === card.id)?.count || 0;

        if (count >= MAX_CARD_COPIES) {
          return DeckBuilderActions.addCardERROR({ message: `Only ${MAX_CARD_COPIES} copies of a card per deck allowed.` });
        }
        if (count === 1 && card.rarity === CardRarity.LEGENDARY) {
          return DeckBuilderActions.addCardERROR({ message: `Only 1 legendary card per deck allowed.` });
        }
        const total = deck.cardIdCounts.reduce((acc, c) => acc + c.count, 0);

        if (total >= MAX_CARDS) {
          return DeckBuilderActions.addCardERROR({ message: `Only ${MAX_CARDS} cards per deck allowed.` });
        }
        return DeckBuilderActions.addCardSUCCESS({ card });
      }),
    );
  });

  readonly showErrorToast = createEffect(() => {
    return this.actions.pipe(
      ofType(DeckBuilderActions.addCardERROR),
      map(({ message }) => ToastActions.showError({ message })),
    );
  });

  constructor(
    private readonly actions: Actions,
    private readonly store: Store,
  ) {}
}
