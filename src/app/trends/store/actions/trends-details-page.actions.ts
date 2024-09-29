import {createAction, props} from "@ngrx/store";
import {TrendRequest} from "../../models/trend-request.model";

export const updateTrend = createAction('[Trend detail] Update', props<{ id: string, trend: TrendRequest }>());
