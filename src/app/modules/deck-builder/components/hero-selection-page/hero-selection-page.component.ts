import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DeckBuilderActions } from '../../store/deck-builder.actions';
import { selectSelectedHeroId, selectSelectionHeroes } from '../../store/deck-builder.selectors';

@Component({
  selector: 'hs-hero-selection-page',
  standalone: false,
  templateUrl: './hero-selection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  readonly heroes = this.store.selectSignal(selectSelectionHeroes);

  readonly selectedHeroId = this.store.selectSignal(selectSelectedHeroId);

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  selectHero(heroId: string): void {
    this.store.dispatch(DeckBuilderActions.selectHero({ id: heroId }));
    this.router.navigateByUrl('/deck-builder');
  }
}
