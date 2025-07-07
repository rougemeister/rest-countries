import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  setTheme(theme: 'light' | 'dark') {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getStoredTheme(): 'light' | 'dark' | null {
    const theme = localStorage.getItem(this.THEME_KEY);
    return theme === 'dark' || theme === 'light' ? theme : null;
  }
}