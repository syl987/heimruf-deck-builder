import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { EntityModule } from '../entity/entity.module';
import { SharedModule } from '../shared/shared.module';
import { CardLibraryPageComponent } from './components/card-library-page/card-library-page.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  imports: [CommonModule, MatTabsModule, OverlayModule, EntityModule, SharedModule, LibraryRoutingModule],
  declarations: [CardLibraryPageComponent],
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }],
})
export class LibraryModule {}
