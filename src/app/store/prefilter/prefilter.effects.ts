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
  readonly initialized = createEffect(() => {
    return this.store.select(selectData).pipe(
      filter(notEmpty),
      map(items =>
        PrefilterActions.initialized({
          items: createCollectibleCardPrefilter(items),
          cardIds: selectCollectibleCardIds(items),
          heroIds: selectCollectibleHeroIds(items),
        }),
      ),
    );
  });

  constructor(private readonly store: Store) {}
}
