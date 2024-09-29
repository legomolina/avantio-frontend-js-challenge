import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import { Trend } from '../../models/trend.model';

export const trendsFeatureKey = 'trends';

export interface State extends EntityState<Trend> {
  selectedTrend: Trend | null;
}

export const adapter: EntityAdapter<Trend> = createEntityAdapter<Trend>();

export const initialState: State = adapter.getInitialState({
  selectedTrend: null,
});

export const trendsReducer = createReducer(
  initialState,
  on(TrendsApiActions.loadTrendsSuccess, (state, { trends }) => {
    return adapter.setAll(trends, state);
  }),
  on(TrendsApiActions.loadTrendsError, (state) => {
    return adapter.removeAll(state);
  }),
  on(
    TrendsApiActions.loadOneTrendSuccess,
    (state, { trend: selectedTrend }): State => {
      return { ...state, selectedTrend };
    }
  ),
  on(TrendsApiActions.loadOneTrendError, (state): State => {
    return { ...state, selectedTrend: null };
  }),
  on(TrendsApiActions.updateTrendsSuccess, (state, { id, trend }): State => {
    const mappedTrend: Partial<Trend> = {
      ...trend,
      body: trend.body.split('\n\n'),
    };
    const updatedState = adapter.updateOne({ id, changes: mappedTrend }, state);
    return { ...updatedState, selectedTrend: { ...state.selectedTrend!, ...mappedTrend } };
  }),
  on(TrendsApiActions.updateTrendError, (state) => {
    // User should be informed via toast or similar
    return { ...state }
  }),
  on(TrendsApiActions.deleteTrendSuccess, (state): State => {
    const updatedState = adapter.removeOne(state.selectedTrend!.id, state);

    return { ...updatedState, selectedTrend: null };
  })
);

export const selectSelectedTrend = (state: State) => state.selectedTrend;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of trend ids
export const selectTrendIds = selectIds;

// select the dictionary of trend entities
export const selectTrendEntities = selectEntities;

// select the array of trends
export const selectAllTrends = selectAll;

// select the total trend count
export const selectTrendTotal = selectTotal;
