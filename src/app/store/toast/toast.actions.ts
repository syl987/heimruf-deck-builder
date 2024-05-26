import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { createActionGroup, props } from '@ngrx/store';

export const ToastActions = createActionGroup({
  source: 'Toast',
  events: {
    'show success': props<{ message: string; options?: Pick<MatSnackBarConfig, 'duration'> }>(),
    'show error': props<{ message: string; options?: Pick<MatSnackBarConfig, 'duration'> }>(),
    'show info': props<{ message: string; options?: Pick<MatSnackBarConfig, 'duration'> }>(),
  },
});
