import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

import { ToastActions } from './toast.actions';

@Injectable()
export class ToastEffects {
  private readonly actions$ = inject(Actions);
  private readonly snackbar = inject(MatSnackBar);

  readonly showSuccessToast = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastActions.showSuccess),
        tap(({ message, options }) => this.snackbar.open(message, undefined, { duration: 4000, ...options, panelClass: 'success' })),
      );
    },
    { dispatch: false },
  );

  readonly showErrorToast = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastActions.showError),
        tap(({ message, options }) => this.snackbar.open(message, undefined, { duration: 7000, ...options, panelClass: 'error' })),
      );
    },
    { dispatch: false },
  );

  readonly showInfoToast = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastActions.showInfo),
        tap(({ message, options }) => this.snackbar.open(message, undefined, { duration: 5000, ...options, panelClass: 'info' })),
      );
    },
    { dispatch: false },
  );
}
