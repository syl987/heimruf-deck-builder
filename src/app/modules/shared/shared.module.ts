import { NgModule } from '@angular/core';

import { EntityButtonComponent } from './components/entity-button/entity-button.component';
import { EntityWrapperComponent } from './components/entity-wrapper/entity-wrapper.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [EntityButtonComponent, EntityWrapperComponent, SafeHtmlPipe],
  exports: [EntityButtonComponent, EntityWrapperComponent, SafeHtmlPipe],
})
export class SharedModule {}
