import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { EntityButtonComponent } from './components/entity-button/entity-button.component';
import { EntityWrapperComponent } from './components/entity-wrapper/entity-wrapper.component';
import { ButtonSpinnerDirective } from './directives/button-spinner.directive';
import { RemoveXmlTagsPipe } from './pipes/remove-xml-tags.pipe';
import { ResponseErrorPipe } from './pipes/response-error.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';

const EXPORTED_DECLARATIONS: Type<any>[] = [
  EntityButtonComponent,
  EntityWrapperComponent,
  ButtonSpinnerDirective,
  ResponseErrorPipe,
  ValidationErrorPipe,
  SafeHtmlPipe,
  RemoveXmlTagsPipe,
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  declarations: [EXPORTED_DECLARATIONS],
  exports: [EXPORTED_DECLARATIONS],
})
export class SharedModule {}
