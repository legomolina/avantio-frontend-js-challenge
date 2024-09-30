import { createAction, props } from '@ngrx/store';

import { Trend } from '../../models/trend.model';
import {TrendRequest} from "../../models/trend-request.model";

export const loadTrendsSuccess = createAction(
  '[Trends/API] Load Trends Success',
  props<{ trends: Trend[] }>()
);

export const loadTrendsError = createAction('[Trends/API] Load Trends Error');

export const loadOneTrendSuccess = createAction(
  '[Trends/API] Load One Trend Success',
  props<{ trend: Trend }>()
);

export const loadOneTrendError = createAction(
  '[Trends/API] Load One Trend Error'
);

export const updateTrendsSuccess = createAction(
  '[Trends/API] Update trend success',
  props<{ id: string, trend: TrendRequest }>()
);

export const updateTrendError = createAction(
  '[Trends/API] Update Trend Error',
);

export const deleteTrendSuccess = createAction('[Trends/API] Delete trend success');

export const deleteTrendError = createAction('[Trends/API] Delete trend error');

export const createTrendSuccess = createAction(
  '[Trends/API] Create trend success',
  props<{ trend: Trend }>()
);

export const createTrendError = createAction('[Trends/API] Create trend error');
