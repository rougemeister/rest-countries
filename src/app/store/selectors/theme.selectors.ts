import { createFeatureSelector } from '@ngrx/store';
import { ThemeState } from '../reducers/theme.reducers';

export const selectTheme = createFeatureSelector<ThemeState>('theme');
