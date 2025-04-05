import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';

import { PrefilterActions } from './prefilter.actions';
import { notEmpty } from '../../functions/typeguard.functions';
import { createCollectibleCardPrefilter, selectCollectibleHeroIds } from '../../helpers/prefilter.helpers';
import { selectDataEntities } from '../data/data.selectors';

@Injectable()
export class PrefilterEffects {
  readonly cardPrefilterInit = createEffect(() => {
    return this.store.select(selectDataEntities).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.initCards({ items: createCollectibleCardPrefilter(items) })),
    );
  });

  readonly heroesPrefilterInit = createEffect(() => {
    return this.store.select(selectDataEntities).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.initHeroes({ ids: selectCollectibleHeroIds(items) })),
    );
  });

  constructor(private readonly store: Store) {}
}
