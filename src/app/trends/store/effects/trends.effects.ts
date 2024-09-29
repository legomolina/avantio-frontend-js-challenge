import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {catchError, filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { routerNavigationAction } from '@ngrx/router-store';

import * as TrendsApiActions from '../actions/trends-api.actions';
import * as TrendsListPageActions from '../actions/trends-list-page.actions';
import * as TrendDetailPageActions from '../actions/trends-details-page.actions';
import { TrendService } from '../../trend.service';
import {Router} from "@angular/router";

@Injectable()
export class TrendsEffects {
  loadTrends$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendsListPageActions.loadTrends),
      mergeMap(() =>
        this.trendService.getAll().pipe(
          map((trends) => TrendsApiActions.loadTrendsSuccess({ trends })),
          catchError(() => of(TrendsApiActions.loadTrendsError()))
        )
      )
    );
  });

  loadOneTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      filter(({ payload }) => /^\/trends\/[a-z0-9]+$/.test(payload.event.url)),
      map(({ payload }) => payload.routerState.root.firstChild?.params['id']),
      switchMap((id: string) =>
        this.trendService.getOne(id).pipe(
          map((trend) => TrendsApiActions.loadOneTrendSuccess({ trend })),
          catchError(() => of(TrendsApiActions.loadOneTrendError()))
        )
      )
    );
  });

  updateTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendDetailPageActions.updateTrend),
      mergeMap(({ id, trend }) =>
        this.trendService.updateTrend(id, trend).pipe(
          map(() => TrendsApiActions.updateTrendsSuccess({ id, trend })),
          catchError(() => of(TrendsApiActions.updateTrendError()))
        )
      )
    );
  });

  deleteTrend$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrendDetailPageActions.deleteTrend),
      mergeMap(({ id }) =>
        this.trendService.deleteTrend(id).pipe(
          map(() => TrendsApiActions.deleteTrendSuccess()),
          tap(() => this.router.navigate(['/trends'])),
          catchError(() => of(TrendsApiActions.deleteTrendError()))
        )
      )
    );
  });

  constructor(private actions$: Actions, private trendService: TrendService, private router: Router) {}
}
