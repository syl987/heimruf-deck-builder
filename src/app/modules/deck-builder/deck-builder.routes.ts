import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DeckBuilderPageComponent } from './components/deck-builder-page/deck-builder-page.component';
import { HeroSelectionPageComponent } from './components/hero-selection-page/hero-selection-page.component';
import { selectHeroGuard } from './guards/select-hero.guard';
import { DeckBuilderEffects } from './store/deck-builder.effects';
import * as fromDeckBuilder from './store/deck-builder.reducer';

export const routes: Routes = [
  {
    path: '',
    providers: [provideState(fromDeckBuilder.deckBuilderFeatureKey, fromDeckBuilder.reducer), provideEffects([DeckBuilderEffects])],
    children: [
      { path: '', pathMatch: 'full', component: HeroSelectionPageComponent },
      { path: ':cardClass', canActivate: [selectHeroGuard], component: DeckBuilderPageComponent },
    ],
  },
];
