import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';
import { DeckBuilderPageComponent } from './components/deck-builder-page/deck-builder-page.component';
import { HeroSelectionPageComponent } from './components/hero-selection-page/hero-selection-page.component';
import { DeckBuilderRoutingModule } from './deck-builder-routing.module';
import { DeckBuilderEffects } from './store/deck-builder.effects';
import * as fromDeckBuilder from './store/deck-builder.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDeckBuilder.deckBuilderFeatureKey, fromDeckBuilder.reducer),
    EffectsModule.forFeature([DeckBuilderEffects]),
    MatButtonModule,
    MatButtonToggleModule,
    EntityModule,
    SharedModule,
    DeckBuilderRoutingModule,
  ],
  declarations: [DeckBuilderPageComponent, HeroSelectionPageComponent],
})
export class DeckBuilderModule {}
