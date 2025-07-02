import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggler',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggler.component.html',
  styleUrl: './theme-toggler.component.scss'
})
export class ThemeTogglerComponent {
toggleTheme() {
  document.body.classList.toggle('dark-theme');
}
}
