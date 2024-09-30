import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { Trend } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { environment } from 'src/environments/environment';
import {PutTrendResponseModel} from "./models/put-trend-response.model";
import {TrendRequest} from "./models/trend-request.model";
import {CreateTrendResponseModel} from "./models/create-trend-response.model";

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly baseUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.baseUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  updateTrend(id: string, trend: TrendRequest): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient
      .put<PutTrendResponseModel>(url, trend)
      .pipe(map(({ modified }) => modified === 1));
  }

  deleteTrend(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    // This endpoint returns the deleted trend, but in this case it's useless
    return this.httpClient.delete<void>(url);
  }

  createTrend(trend: TrendRequest): Observable<Trend> {
    const url = `${this.baseUrl}`;
    return this.httpClient.post<CreateTrendResponseModel>(url, trend).pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }
}
