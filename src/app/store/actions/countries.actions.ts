import { createAction, props } from '@ngrx/store';
import { Country } from '../../core/model/model';

export const loadCountries = createAction('[Country] Load Countries');


export const loadCountriesSuccess = createAction(
    '[Country] Load Success', props<{ countries: Country[] }>()
);
export const loadCountriesFailure = createAction(
    '[Country] Load Failure', props<{ error: string }>()
);

export const setFilterRegion = createAction(
    '[Country] Set Filter Region', props<{ region: string | null }>()
);
export const setSearchQuery = createAction(
    '[Country] Set Search Query', props<{ query: string }>()
);
