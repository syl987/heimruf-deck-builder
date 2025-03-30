import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'deck-builder', loadChildren: () => import('src/app/modules/deck-builder/deck-builder.module').then(m => m.DeckBuilderModule) },
  { path: 'library', loadChildren: () => import('src/app/modules/library/library.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
