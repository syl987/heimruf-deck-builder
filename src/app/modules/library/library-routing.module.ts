import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardLibraryPageComponent } from './components/card-library-page/card-library-page.component';
import { cardClassGuard } from './guards/card-class.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cards/neutral' },
  { path: 'cards', redirectTo: 'cards/neutral' },
  { path: 'cards/:cardClass', canActivate: [cardClassGuard], component: CardLibraryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
