import { Pipe, PipeTransform } from '@angular/core';

import { XML_TAGS_REGEX } from '../../../models/regex.models';

@Pipe({
  name: 'removeXmlTags',
})
export class RemoveXmlTagsPipe implements PipeTransform {
  transform(value: string | null | undefined): string | null {
    if (value == null) {
      return null;
    }
    return value.replace(XML_TAGS_REGEX, '');
  }
}
