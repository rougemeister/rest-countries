// countries.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountryApiService } from '../../core/services/country-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CountryActions from '../actions/countries.actions';

@Injectable()
export class CountryEffects { 

  private actions$ = inject(Actions);
  private api = inject(CountryApiService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.api.getAllCountries().pipe(
          map(countries => CountryActions.loadCountriesSuccess({ countries })),
          catchError(error =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}