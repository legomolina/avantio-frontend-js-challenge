import {Component, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';

import { selectSelectedTrend } from '../store/selectors';
import {TrendEditComponent} from "../trend-edit/trend-edit.component";
import {deleteTrend} from "../store/actions/trends-details-page.actions";
import {openEditTrend} from "../../store/actions/edit-trend.actions";
import {Trend} from "../models/trend.model";

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button" class="trend__action" (click)="editTrend(trend)">
            <img src="assets/Iconos/Actions/edit.svg" alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action" (click)="removeTrend(trend.id)">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);

  constructor(private store: Store) {}

  editTrend(trend: Trend) {
    this.store.dispatch(openEditTrend({ trend }))
  }

  removeTrend(id: string) {
    this.store.dispatch(deleteTrend({ id }));
  }
}
