import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, forkJoin, map, switchMap } from 'rxjs';

import { PrefilterActions } from './prefilter.actions';
import { notEmpty } from '../../functions/typeguard.functions';
import { createCollectibleCardPrefilter, selectCollectibleCardIds, selectCollectibleHeroIds } from '../../helpers/prefilter.helpers';
import { selectData } from '../data/data.selectors';

@Injectable()
export class PrefilterEffects {
  private readonly store = inject(Store);

  readonly initialized = createEffect(() => {
    return this.store.select(selectData).pipe(
      filter(notEmpty),
      switchMap(items =>
        forkJoin({
          items: createCollectibleCardPrefilter(items),
          cardIds: selectCollectibleCardIds(items),
          heroIds: selectCollectibleHeroIds(items),
        }).pipe(map(payload => PrefilterActions.initialized(payload))),
      ),
    );
  });
}
