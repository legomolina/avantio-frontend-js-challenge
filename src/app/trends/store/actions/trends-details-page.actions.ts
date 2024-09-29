import {createAction, props} from "@ngrx/store";
import {TrendRequest} from "../../models/trend-request.model";

export const deleteTrend = createAction('[Trend detail] Delete', props<{ id: string }>());

export const updateTrend = createAction('[Trend detail] Update', props<{ id: string, trend: TrendRequest }>());
