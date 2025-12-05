import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of } from 'rxjs';

import { DataActions } from './data.actions';
import { Entity } from '../../models/entity.models';
import { DataService } from '../../services/data.service';

const NEUTRAL_CARD_REDUCTION_FACTOR = 10; // reduce number of neutral cards with cost < 8 by this factor

/**
 * Filter to reduce number of neutral cards with the specified cost.
 *
 * @param [factor=NEUTRAL_CARD_REDUCTION_FACTOR] reduction rate
 */
function reduceNeutralCards(factor = NEUTRAL_CARD_REDUCTION_FACTOR) {
  return map<Entity[], Entity[]>(cardData => cardData.filter((c, i) => (c.type !== 'HERO' && c.cardClass === 'NEUTRAL' && c.cost < 8 ? i % factor === 0 : true)));
}

@Injectable()
export class DataEffects implements OnInitEffects {
  private readonly actions = inject(Actions);
  private readonly dataService = inject(DataService);

  readonly load = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.load),
      concatMap(_ =>
        this.dataService.loadCardData().pipe(
          reduceNeutralCards(), // workaround: reduce rendered data for performance reasons
          map(cardData => DataActions.loadSUCCESS({ cardData })),
          catchError((err: unknown) => of(DataActions.loadERROR())),
        ),
      ),
    );
  });

  ngrxOnInitEffects(): Action {
    return DataActions.load();
  }
}
