import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { forkJoin, map, filter, switchMap } from 'rxjs';

import { notEmpty } from 'src/app/functions/typeguard.functions';
import { createCardComponents } from 'src/app/helpers/prerender.helpers';

import { PrerenderActions } from './prerender.actions';
import { selectPrefilteredCards } from '../prefilter/prefilter.selectors';

@Injectable()
export class PrerenderEffects {
  readonly initialized = createEffect(() => {
    return this.store.select(selectPrefilteredCards).pipe(
      filter(notEmpty),
      switchMap(items =>
        forkJoin({
          items: createCardComponents(items),
        }).pipe(map(payload => PrerenderActions.initialized(payload))),
      ),
    );
  });

  constructor(private readonly store: Store) {}
}
