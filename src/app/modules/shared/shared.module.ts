import { NgModule } from '@angular/core';

import { EntityButtonComponent } from './components/entity-button/entity-button.component';
import { EntityWrapperComponent } from './components/entity-wrapper/entity-wrapper.component';
import { RemoveXmlTagsPipe } from './pipes/remove-xml-tags.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [EntityButtonComponent, EntityWrapperComponent, SafeHtmlPipe, RemoveXmlTagsPipe],
  exports: [EntityButtonComponent, EntityWrapperComponent, SafeHtmlPipe, RemoveXmlTagsPipe],
})
export class SharedModule {}
