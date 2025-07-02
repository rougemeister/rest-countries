import { createReducer, on } from '@ngrx/store';
import * as CountryActions from '../actions/countries.actions';
import { initialCountryState } from '../state/countries.state';

export const countryReducer = createReducer(
  initialCountryState,
  on(CountryActions.loadCountries, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    countries
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CountryActions.setFilterRegion, (state, { region }) => ({
    ...state,
    filterRegion: region
  })),
  on(CountryActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  }))
);
