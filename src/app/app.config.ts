import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { countryReducer } from './store/reducers/countries.reducers';
import { CountryEffects } from './store/effects/countries.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(), // Move HTTP client first
    provideRouter(routes),
    
    // NgRx providers in correct order
    provideStore({ countries: countryReducer }),
    provideEffects([CountryEffects]),
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: false,
      connectInZone: true // Add this for standalone apps
    })
  ]
};