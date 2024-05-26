import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { notEmpty } from 'src/app/functions/typeguard.functions';
import { selectDataEntities } from 'src/app/store/data/data.selectors';

import { createCollectibleCardPrefilter, selectCollectibleHeroIds } from '../../helpers/prefilter.helpers';
import { PrefilterActions } from './prefilter.actions';

@Injectable()
export class PrefilterEffects {
  readonly cardPrefilterInit = createEffect(() => {
    return this.store.select(selectDataEntities).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.initCards({ items: createCollectibleCardPrefilter(items) })), // TODO importing any entity
    );
  });

  readonly heroesPrefilterInit = createEffect(() => {
    return this.store.select(selectDataEntities).pipe(
      filter(notEmpty),
      map(items => PrefilterActions.initHeroes({ ids: selectCollectibleHeroIds(items) })), // TODO importing any entity
    );
  });

  constructor(private readonly store: Store) {}
}
