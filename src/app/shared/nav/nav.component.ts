import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { FilterComponent } from "../../components/filter/filter.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SearchComponent, FilterComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
