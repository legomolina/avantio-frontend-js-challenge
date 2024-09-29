import {Trend} from "../../trends/models/trend.model";
import {createReducer, on} from "@ngrx/store";
import * as EditTrendActions from '../actions/edit-trend.actions';

export const trendEditFeatureKey = 'trendEdit';

export type State = {
  isOpen: boolean,
  trend: Trend | null,
};

export const initialState: State = {
  isOpen: false,
  trend: null,
};

export const reducer = createReducer(
  initialState,
  on(
    EditTrendActions.openEditTrend,
    (_, { trend }): State => ({ isOpen: true, trend }),
  ),
  on(
    EditTrendActions.closeEditTrend,
    () => ({ isOpen: false, trend: null }),
  ),
);

export const selectEditTrendIsOpenState = (state: State) => state.isOpen;
export const selectEditTrendTrendState = (state: State) => state.trend;
