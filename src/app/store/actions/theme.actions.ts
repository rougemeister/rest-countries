import { createAction, props } from '@ngrx/store';

export const setTheme = createAction('[Theme] Set Theme', props<{ theme: 'light' | 'dark' }>());
export const loadTheme = createAction('[Theme] Load Stored Theme');
