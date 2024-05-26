import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export enum ResponseErrorType {
  BACKEND = '[Error] backend',
  INTERNAL = '[Error] internal',
}

export interface BackendError {}

export type BackendErrorResponse = Omit<HttpErrorResponse, 'error'> & { error: null };

export interface InternalError {
  message: string;
}

export const backendError = createAction(ResponseErrorType.BACKEND, props<{ error?: Partial<BackendErrorResponse> }>());

export const internalError = createAction(ResponseErrorType.INTERNAL, props<{ error: InternalError }>());

export type ResponseError = ReturnType<typeof backendError | typeof internalError>;
