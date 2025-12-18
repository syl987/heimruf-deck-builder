import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';

import { Card, CardType } from 'src/app/models/entity.models';
import { SelectionFilter } from 'src/app/models/library.models';
import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { DeckBuilderStore } from '../../store/deck-builder.store';

@Component({
  selector: 'hs-deck-builder-page',
  imports: [RouterModule, MatButtonModule, MatButtonToggleModule, EntityModule, SharedModule, TitleCasePipe],
  templateUrl: './deck-builder-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckBuilderPageComponent {
  readonly #store = inject(DeckBuilderStore);

  readonly cards = this.#store.cards();
  readonly filter = this.#store.filter();

  readonly selectedHero = this.#store.selectedHero().hero();

  readonly deck = Object.freeze({
    cardCounts: this.#store.deck().cardCounts(),
    cardsTotal: this.#store.deck().cardsTotal(),
    empty: this.#store.deck().empty(),
  });

  readonly CardType = CardType;

  readonly SelectionFilter = SelectionFilter;

  filterCards(filter: SelectionFilter): void {
    this.#store.filterCards(filter);
  }

  addCard(card: Card): void {
    this.#store.addCard(card);
  }

  removeCard(id: string): void {
    this.#store.removeCard(id);
  }

  removeAllCards(): void {
    this.#store.removeCards();
  }
}
