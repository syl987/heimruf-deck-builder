import { Pipe, PipeTransform } from '@angular/core';

import { ResponseError, ResponseErrorType } from '../../../models/error.models';

const UNKNOWN_ERROR_MESSAGE = `An unknown error occurred.`;

@Pipe({
  name: 'responseError',
  standalone: false,
})
export class ResponseErrorPipe implements PipeTransform {
  transform(value: ResponseError | null | undefined): string | null {
    if (value == null) {
      return null;
    }
    switch (value.type) {
      case ResponseErrorType.BACKEND:
        return value.error?.message || UNKNOWN_ERROR_MESSAGE;
      case ResponseErrorType.INTERNAL:
        return value.error.message || UNKNOWN_ERROR_MESSAGE;
      default:
        return UNKNOWN_ERROR_MESSAGE;
    }
  }
}
