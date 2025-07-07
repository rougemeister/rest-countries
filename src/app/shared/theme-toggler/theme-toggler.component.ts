import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setTheme } from '../../store/actions/theme.actions';
import { selectTheme } from '../../store/selectors/theme.selectors';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss'
})
export class ThemeTogglerComponent implements OnInit {
  theme$: Observable<'light' | 'dark'>;

  constructor(private store: Store) {
    this.theme$ = this.store.select(selectTheme);
  }

  ngOnInit(): void {
    this.theme$.subscribe(theme => {
      console.log('Current theme:', theme);
    });
  }

  toggleTheme(current: 'light' | 'dark') {
    const next = current === 'light' ? 'dark' : 'light';
    this.store.dispatch(setTheme({ theme: next }));
  }
}
