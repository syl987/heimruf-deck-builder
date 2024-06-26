import { isDevMode } from '@angular/core';
import { MinimalRouterStateSnapshot, routerReducer, RouterReducerState, RouterState, StoreRouterConfig } from '@ngrx/router-store';
import { ActionReducerMap, RootStoreConfig } from '@ngrx/store';

import { consoleLogMetaReducer } from './app.meta-reducers';
import { DataEffects } from './data/data.effects';
import * as fromData from './data/data.reducer';
import { PrefilterEffects } from './prefilter/prefilter.effects';
import * as fromPrefilter from './prefilter/prefilter.reducer';
import { ToastEffects } from './toast/toast.effects';

interface AppState {
  router: RouterReducerState<MinimalRouterStateSnapshot>;
  [fromData.dataFeatureKey]: fromData.State;
  [fromPrefilter.prefilterFeatureKey]: fromPrefilter.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  [fromData.dataFeatureKey]: fromData.reducer,
  [fromPrefilter.prefilterFeatureKey]: fromPrefilter.reducer,
};

export const effects = [DataEffects, PrefilterEffects, ToastEffects];

export const config: RootStoreConfig<AppState> = {
  metaReducers: isDevMode() ? [consoleLogMetaReducer] : [consoleLogMetaReducer],
  runtimeChecks: {
    strictActionImmutability: isDevMode(),
    strictStateImmutability: isDevMode(),
    strictActionSerializability: isDevMode(),
    strictStateSerializability: isDevMode(),
    strictActionWithinNgZone: isDevMode(),
  },
};

export const routerStoreConfig: StoreRouterConfig = {
  routerState: RouterState.Minimal,
};
