import { Country } from "../../core/model/model";

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  filterRegion: string | null;
  searchQuery: string;
}

export const initialCountryState: CountryState = {
  countries: [],
  loading: false,
  error: null,
  filterRegion: null,
  searchQuery: ''
};
