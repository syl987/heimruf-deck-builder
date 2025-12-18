import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { selectPrefilteredHeroes } from 'src/app/store/prefilter/prefilter.selectors';

import { DeckBuilderActions } from '../../store/deck-builder.actions';
import { selectSelectedHeroId } from '../../store/deck-builder.selectors';

@Component({
  selector: 'hs-hero-selection-page',
  imports: [RouterModule, EntityModule, SharedModule],
  templateUrl: './hero-selection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  readonly #store = inject(Store);
  readonly #router = inject(Router);

  readonly heroes = this.#store.selectSignal(selectPrefilteredHeroes);

  readonly selectedHeroId = this.#store.selectSignal(selectSelectedHeroId);

  selectHero(heroId: string): void {
    this.#store.dispatch(DeckBuilderActions.selectHero({ id: heroId }));
    this.#router.navigateByUrl('/deck-builder');
  }
}
