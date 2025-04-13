import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of } from 'rxjs';

import { DataActions } from './data.actions';
import { DataService } from '../../services/data.service';

@Injectable()
export class DataEffects implements OnInitEffects {
  readonly load = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.load),
      concatMap(_ =>
        this.dataService.loadCardData().pipe(
          map(cardData => DataActions.loadSUCCESS({ cardData })),
          catchError(_ => of(DataActions.loadERROR())),
        ),
      ),
    );
  });

  constructor(
    private readonly actions: Actions,
    private readonly dataService: DataService,
  ) {}

  ngrxOnInitEffects(): Action {
    return DataActions.load();
  }
}
