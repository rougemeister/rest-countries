import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavComponent } from "../../shared/nav/nav.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, NavComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

}
