import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from '../state/countries.state';

export const selectCountryState = createFeatureSelector<CountryState>('countries');

export const selectAllCountries = createSelector(
  selectCountryState,
  state => state.countries
);

export const selectLoading = createSelector(
  selectCountryState,
  state => state.loading
);

export const selectError = createSelector(
  selectCountryState,
  state => state.error
);

export const selectFilterRegion = createSelector(
  selectCountryState,
  state => state.filterRegion
);

export const selectSearchQuery = createSelector(
  selectCountryState,
  state => state.searchQuery
);

export const selectFilteredCountries = createSelector(
  selectAllCountries,
  selectFilterRegion,
  selectSearchQuery,
  (countries, region, query) => {
    let filtered = countries;

    if (region) {
      filtered = filtered.filter(c =>
        c.region.toLowerCase() === region.toLowerCase()
      );
    }

    if (query.trim()) {
      filtered = filtered.filter(c =>
        c.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  }
);
