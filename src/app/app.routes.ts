import { Routes } from '@angular/router';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'deck-builder', loadChildren: () => import('./modules/deck-builder/deck-builder.routes').then(m => m.routes) },
  { path: 'library', loadChildren: () => import('./modules/library/library.routes').then(m => m.routes) },
  { path: '**', redirectTo: 'welcome' },
];
