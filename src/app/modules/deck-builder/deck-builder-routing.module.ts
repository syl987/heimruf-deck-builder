import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeckBuilderPageComponent } from './components/deck-builder-page/deck-builder-page.component';
import { HeroSelectionPageComponent } from './components/hero-selection-page/hero-selection-page.component';
import { selectHeroGuard } from './guards/select-hero.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HeroSelectionPageComponent },
  { path: ':cardClass', canActivate: [selectHeroGuard], component: DeckBuilderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeckBuilderRoutingModule {}
