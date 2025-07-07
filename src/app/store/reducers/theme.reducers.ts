import { createReducer, on } from '@ngrx/store';
import { setTheme } from '../actions/theme.actions';

export type ThemeState = 'light' | 'dark';

export const initialState: ThemeState = 'light';

export const themeReducer = createReducer<ThemeState>(
  initialState,
  on(setTheme, (_, { theme }) => theme)
);