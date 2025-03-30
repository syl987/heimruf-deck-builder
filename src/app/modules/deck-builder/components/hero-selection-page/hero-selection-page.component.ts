import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { DeckBuilderActions } from '../../store/deck-builder.actions';
import { selectSelectedHeroId, selectSelectionHeroes } from '../../store/deck-builder.selectors';

@Component({
  selector: 'hs-hero-selection-page',
  imports: [RouterModule, EntityModule, SharedModule],
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
