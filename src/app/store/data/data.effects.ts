import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

import { DataActions } from './data.actions';

@Injectable()
export class DataEffects implements OnInitEffects {
  readonly load = createEffect(() => {
    return this.actions.pipe(
      ofType(DataActions.load),
      concatMap(_ =>
        this.dataService.loadEntities().pipe(
          map(entities => DataActions.loadSUCCESS({ entities })),
          catchError((err?: Partial<HttpErrorResponse>) => {
            switch (err?.status) {
              default:
                return of(DataActions.loadERROR());
            }
          }),
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
