import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, filter, switchMap } from 'rxjs';

import { notEmpty } from 'src/app/functions/typeguard.functions';
import { createCardComponents } from 'src/app/helpers/prerender.helpers';

import { PrerenderActions } from './prerender.actions';
import { selectPrefilteredCards } from '../prefilter/prefilter.selectors';
import { from } from 'rxjs';

@Injectable()
export class PrerenderEffects {
  readonly initialized = createEffect(() => {
    return this.store.select(selectPrefilteredCards).pipe(
      filter(notEmpty),
      switchMap(items => from(createCardComponents(items))),
      map(items => PrerenderActions.initialized({ items })),
    );
  });

  constructor(private readonly store: Store) {}
}
