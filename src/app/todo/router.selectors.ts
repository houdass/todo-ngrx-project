import { createFeatureSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
  >('router');

export const {
  selectUrl
} = fromRouter.getSelectors(selectRouter);
