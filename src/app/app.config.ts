import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { countryReducer } from './store/reducers/countries.reducers';
import { CountryEffects } from './store/effects/countries.effects';

import { themeReducer } from './store/reducers/theme.reducers';
import { themeEffects, persistThemeEffect } from './store/effects/theme.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),

    provideStore({
      countries: countryReducer,
      theme: themeReducer 
    }),

    provideEffects(CountryEffects),
    provideEffects({
      themeEffects,         
      persistThemeEffect    
    }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      connectInZone: true
    })
  ]
};
