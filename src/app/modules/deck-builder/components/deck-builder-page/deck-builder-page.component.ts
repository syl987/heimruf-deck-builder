import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Card, CardType } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';
import { DeckBuilderActions } from 'src/app/modules/deck-builder/store/deck-builder.actions';

import {
  selectSelectedDeckCardCounts,
  selectSelectedDeckCardsTotal,
  selectSelectedDeckEmpty,
  selectSelectedHero,
  selectSelectionCards,
  selectSelectionFilter,
} from '../../store/deck-builder.selectors';

@Component({
  selector: 'hs-deck-builder-page',
  templateUrl: './deck-builder-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckBuilderPageComponent {
  readonly cards = this.store.selectSignal(selectSelectionCards);
  readonly hero = this.store.selectSignal(selectSelectedHero);

  readonly filter = this.store.selectSignal(selectSelectionFilter);

  readonly deckCardCounts = this.store.selectSignal(selectSelectedDeckCardCounts);
  readonly deckCardsTotal = this.store.selectSignal(selectSelectedDeckCardsTotal);
  readonly deckEmpty = this.store.selectSignal(selectSelectedDeckEmpty);

  readonly CardType = CardType;

  readonly SelectionFilter = SelectionFilter;

  constructor(private readonly store: Store) {}

  filterCards(filter: SelectionFilter): void {
    this.store.dispatch(DeckBuilderActions.filterCards({ filter }));
  }

  addCard(card: Card): void {
    this.store.dispatch(DeckBuilderActions.addCard({ card }));
  }

  removeCard(id: string): void {
    this.store.dispatch(DeckBuilderActions.removeCard({ id }));
  }

  removeAllCards(): void {
    this.store.dispatch(DeckBuilderActions.removeCards());
  }
}
