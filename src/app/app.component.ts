import {Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs/operators';

import { CustomBreakpointObserver } from './layout';
import {selectIsLoadingState, selectEditTrendIsOpen, selectEditTrendTrend} from './store/selectors';
import {TrendEditComponent} from "./trends/trend-edit/trend-edit.component";

@Component({
  selector: 'app-root',
  template: `
    <app-progress-bar
      *ngIf="isLoading$ | async"
      class="app-progress-bar"
    ></app-progress-bar>
    <app-add-trend-button></app-add-trend-button>
    <app-trend-edit #trendEdit [trend]="trend$ | async"></app-trend-edit>
    <header class="app-header">
      <a routerLink="/">
        <img
          *ngIf="isSmallScreen$ | async"
          class="app-logo"
          src="assets/Logos/aTrendsPRO.svg"
          alt="Logo Avantio Trends PRO"
        />
      </a>
      <div class="app-current-date">
        <span>{{ currentDate | date: 'dd MMMM yyyy' }}</span>
      </div>
    </header>
    <nav class="app-navigation">
      <app-menu-small *ngIf="isSmallScreen$ | async"></app-menu-small>
      <app-menu-medium *ngIf="isMediumScreen$ | async"></app-menu-medium>
      <app-menu-large *ngIf="isLargeScreen$ | async"></app-menu-large>
    </nav>
    <main class="app-main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('trendEdit', { static: true }) trendEditDialog!: TrendEditComponent;

  currentDate = Date.now();
  isSmallScreen$ = this.breakpointsObserver.isSmall$;
  isMediumScreen$ = this.breakpointsObserver.isMedium$;
  isLargeScreen$ = this.breakpointsObserver.isLarge$;
  // The delay prevents ExpressionChangedAfterItHasBeenCheckedError
  isLoading$ = this.store.select(selectIsLoadingState).pipe(delay(0));
  trend$ = this.store.select(selectEditTrendTrend);

  constructor(
    private breakpointsObserver: CustomBreakpointObserver,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectEditTrendIsOpen).subscribe((open) => {
      if (open) {
        this.trendEditDialog.openModal();
      } else {
        this.trendEditDialog.closeModal();
      }
    });
  }
}
