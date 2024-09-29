import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import * as fromLoaderReducer from './loader.reducer';
import * as fromEditTrendReducer from './edit-trend.reducer';

export interface State {
  loader: fromLoaderReducer.State;
  [fromEditTrendReducer.trendEditFeatureKey]: fromEditTrendReducer.State;
  router: RouterState;
}

export const reducers: ActionReducerMap<State> = {
  loader: fromLoaderReducer.reducer,
  [fromEditTrendReducer.trendEditFeatureKey]: fromEditTrendReducer.reducer,
  router: routerReducer,
};
