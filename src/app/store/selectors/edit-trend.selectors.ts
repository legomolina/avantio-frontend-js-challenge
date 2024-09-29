import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromEditTrendReducer from '../reducers/edit-trend.reducer';

export const selectEditTrendState =
  createFeatureSelector<fromEditTrendReducer.State>(fromEditTrendReducer.trendEditFeatureKey);

export const selectEditTrendIsOpen = createSelector(
  selectEditTrendState,
  fromEditTrendReducer.selectEditTrendIsOpenState
)

export const selectEditTrendTrend = createSelector(
  selectEditTrendState,
  fromEditTrendReducer.selectEditTrendTrendState,
)
