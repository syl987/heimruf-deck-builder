import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { Card, CardType } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';
import { DeckBuilderActions } from 'src/app/modules/deck-builder/store/deck-builder.actions';
import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

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
  imports: [RouterModule, MatButtonModule, MatButtonToggleModule, EntityModule, SharedModule, TitleCasePipe],
  templateUrl: './deck-builder-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckBuilderPageComponent {
  private readonly store = inject(Store);

  readonly cards = this.store.selectSignal(selectSelectionCards);
  readonly filter = this.store.selectSignal(selectSelectionFilter);

  readonly selectedHero = this.store.selectSignal(selectSelectedHero);

  readonly deck = Object.freeze({
    cardCounts: this.store.selectSignal(selectSelectedDeckCardCounts),
    cardsTotal: this.store.selectSignal(selectSelectedDeckCardsTotal),
    empty: this.store.selectSignal(selectSelectedDeckEmpty),
  });

  readonly CardType = CardType;

  readonly SelectionFilter = SelectionFilter;

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
