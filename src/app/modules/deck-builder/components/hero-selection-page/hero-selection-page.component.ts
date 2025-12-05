import { AsyncPipe } from '@angular/common';
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
  imports: [RouterModule, EntityModule, SharedModule, AsyncPipe],
  templateUrl: './hero-selection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  readonly heroes$ = this.store.select(selectPrefilteredHeroes);

  readonly selectedHeroId$ = this.store.select(selectSelectedHeroId);

  selectHero(heroId: string): void {
    this.store.dispatch(DeckBuilderActions.selectHero({ id: heroId }));
    this.router.navigateByUrl('/deck-builder');
  }
}
