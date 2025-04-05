import { BaseRouterStoreState, getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouterState = createFeatureSelector<RouterReducerState<BaseRouterStoreState>>('router');

export const selectRouterUrl = getRouterSelectors(selectRouterState).selectUrl;
export const selectRouterParam = getRouterSelectors(selectRouterState).selectRouteParam;
export const selectRouterTitle = getRouterSelectors(selectRouterState).selectTitle;
