import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { LOCALE_ID, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout';
import { AppMenuModule } from './menu';
import { AppPageNotFoundComponent } from './app-page-not-found.component';
import { AppProgressBarComponent } from './app-progress-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppTrendsModule } from './trends';
import { httpInterceptorProviders } from './app-http-interceptors';
import { reducers } from './store/reducers';

import {CoreModule} from "./_core/core.module";
import {SharedModule} from "./_shared/shared.module";

import localeEs from '@angular/common/locales/es';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    AppProgressBarComponent,
    AppPageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppTrendsModule,
    AppRoutingModule,
    AppLayoutModule,
    AppMenuModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
