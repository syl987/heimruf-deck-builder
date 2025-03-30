import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import deLocale from '@angular/common/locales/de';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, isDevMode, LOCALE_ID } from '@angular/core';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as dataConfig from 'src/data.config.json';

import { routes } from './app.routes';
import { DirtyAndTouchedMatcher } from './matchers/dirty-and-touched.matcher';
import { APP_DATA_CONFIG, APP_OPTIONS, AppOptions } from './models/app.models';
import { buttonToggleConfig } from './options/button-toggle.config';
import { snackBarConfig } from './options/snack-bar.config';
import { config, effects, reducers, routerStoreConfig } from './store/app.store';

registerLocaleData(deLocale, 'de');

// TODO fix fonts loading speed and transition
// TODO fix card image miner
// TODO enable more card sets
// TODO card set filter + prefilter
// TODO improve performance on mobile

// TODO precreate card components

// TODO normalize store files and logic
// TODO migrate image data as image files

// TODO bug: mat ripple positioning on scaled elements
// TODO bug: active tab link not set active on load
// TODO bug: entity blur on change detection

// TODO bug: performance on mobile / tablet
// TODO bug: image positioning on iOS

const appOptions: AppOptions = {
  applicationName: 'Heimruf Deck Builder',
  copyrightName: 'Igor M.',
  copyrightYear: '2024',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideStore(reducers, config),
    provideEffects(effects),
    provideRouterStore(routerStoreConfig),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), connectInZone: true }),

    importProvidersFrom(
      MatSnackBarModule, // used centrally
    ),

    { provide: LOCALE_ID, useValue: 'de' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: APP_OPTIONS, useValue: appOptions },
    { provide: APP_DATA_CONFIG, useValue: dataConfig },

    { provide: ErrorStateMatcher, useClass: DirtyAndTouchedMatcher },

    /* { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: dialogConfig }, */
    /* { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: formFieldConfig }, */
    /* { provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, useValue: progressSpinnerConfig }, */
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: snackBarConfig },
    { provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, useValue: buttonToggleConfig },
  ],
};
