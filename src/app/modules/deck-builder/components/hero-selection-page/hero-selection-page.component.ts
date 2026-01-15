import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { EntityModule } from 'src/app/modules/entity/entity.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { DeckBuilderStore } from '../../store/deck-builder.store';

@Component({
  selector: 'hs-hero-selection-page',
  imports: [RouterModule, EntityModule, SharedModule],
  templateUrl: './hero-selection-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectionPageComponent {
  readonly #store = inject(DeckBuilderStore);
  readonly #router = inject(Router);

  readonly heroes = this.#store.heroes();

  readonly selectedHeroId = this.#store.selectedHero().id();

  selectHero(heroId: string): void {
    this.#store.selectHero(heroId);
    this.#router.navigateByUrl('/deck-builder');
  }
}
