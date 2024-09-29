import {createAction, props} from "@ngrx/store";
import {Trend} from "../../trends/models/trend.model";

export const openEditTrend = createAction('[Edit trend] Open', props<{ trend: Trend | null }>());

export const closeEditTrend = createAction('[Edit trend] close');
