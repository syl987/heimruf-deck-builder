import { NgModule } from '@angular/core';

import { EntityButtonComponent } from './components/entity-button/entity-button.component';
import { EntityWrapperComponent } from './components/entity-wrapper/entity-wrapper.component';
import { ButtonSpinnerDirective } from './directives/button-spinner.directive';
import { RemoveXmlTagsPipe } from './pipes/remove-xml-tags.pipe';
import { ResponseErrorPipe } from './pipes/response-error.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';

const EXPORTED_DECLARATIONS = [EntityButtonComponent, EntityWrapperComponent, ButtonSpinnerDirective, ResponseErrorPipe, ValidationErrorPipe, SafeHtmlPipe, RemoveXmlTagsPipe];

@NgModule({
  imports: [EXPORTED_DECLARATIONS],
  exports: [EXPORTED_DECLARATIONS],
})
export class SharedModule {}
