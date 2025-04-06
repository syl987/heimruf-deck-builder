import { getRouterSelectors, createRouterSelector } from '@ngrx/router-store';

export const selectRouterState = createRouterSelector();

export const selectRouterUrl = getRouterSelectors(selectRouterState).selectUrl;
export const selectRouterParam = getRouterSelectors(selectRouterState).selectRouteParam;
export const selectRouterTitle = getRouterSelectors(selectRouterState).selectTitle;
