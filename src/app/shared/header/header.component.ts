import { Component } from '@angular/core';
import { ThemeTogglerComponent } from "../theme-toggler/theme-toggler.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeTogglerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
