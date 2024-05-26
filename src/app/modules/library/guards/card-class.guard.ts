import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { APP_DATA_CONFIG } from '../../../models/app.models';

export const cardClassGuard: CanActivateFn = (route, state, router = inject(Router), config = inject(APP_DATA_CONFIG)) => {
  const param: string | undefined = route.params['cardClass']?.toUpperCase();
  const result = config.cardClasses.some(cardClass => cardClass === param);

  if (!result) {
    router.navigateByUrl(`/library`);
  }
  return result;
};
