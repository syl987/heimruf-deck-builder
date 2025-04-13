import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { notEmpty } from 'src/app/functions/typeguard.functions';

import { DeckBuilderActions } from '../store/deck-builder.actions';
import { selectPrefilteredHeroes } from 'src/app/store/prefilter/prefilter.selectors';

export const selectHeroGuard: CanActivateFn = (route, state, store = inject(Store), router = inject(Router)) => {
  const param: string | undefined = route.params['cardClass']?.toUpperCase();

  return store.select(selectPrefilteredHeroes).pipe(
    filter(notEmpty),
    map(heroes => heroes.find(hero => hero.cardClass === param)),
    map(hero => {
      if (hero) {
        store.dispatch(DeckBuilderActions.selectHero({ id: hero.id }));
        return true;
      }
      router.navigateByUrl('/deck-builder');
      return false;
    }),
  );
};
