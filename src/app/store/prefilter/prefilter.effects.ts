import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { PrefilterActions } from './prefilter.actions';
import { notEmpty } from '../../functions/typeguard.functions';
import { createCollectibleCardPrefilter, selectCollectibleCardIds, selectCollectibleHeroIds } from '../../helpers/prefilter.helpers';
import { selectData } from '../data/data.selectors';

@Injectable()
export class PrefilterEffects {
  readonly cardPrefilterInitialized = createEffect(() => {
    return this.store.select(selectData).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.cardPrefilterInitialized({ ids: selectCollectibleCardIds(items), items: createCollectibleCardPrefilter(items) })),
    );
  });

  readonly heroPrefilterInitialized = createEffect(() => {
    return this.store.select(selectData).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.heroPrefilterInitialized({ ids: selectCollectibleHeroIds(items) })),
    );
  });

  constructor(private readonly store: Store) {}
}
