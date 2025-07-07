import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTheme, setTheme } from '../actions/theme.actions';
import { ThemeService } from '../../core/services/theme.service';
import { map, tap } from 'rxjs/operators';

export const themeEffects = createEffect(() => {
  const actions$ = inject(Actions);
  const themeService = inject(ThemeService);

  return actions$.pipe(
    ofType(loadTheme),
    map(() => themeService.getStoredTheme() || 'light'),
    map(theme => setTheme({ theme }))
  );
}, { functional: true });

export const persistThemeEffect = createEffect(() => {
  const actions$ = inject(Actions);
  const themeService = inject(ThemeService);

  return actions$.pipe(
    ofType(setTheme),
    tap(({ theme }) => themeService.setTheme(theme))
  );
}, { functional: true, dispatch: false });
