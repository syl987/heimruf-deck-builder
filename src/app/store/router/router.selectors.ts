import { getRouterSelectors, createRouterSelector } from '@ngrx/router-store';

export const selectRouterState = createRouterSelector();

export const {
  selectUrl: selectRouterUrl,
  selectRouteParam: selectRouterRouteParam,
  selectRouteParams: selectRouterRouteParams,
  selectTitle: selectRouterTitle,
} = getRouterSelectors(selectRouterState);
