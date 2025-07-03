import { Component, inject } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { FilterComponent } from "../../components/filter/filter.component";
import { setSearchQuery } from '../../store/actions/countries.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SearchComponent, FilterComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  private store = inject(Store);
     onSearch(query: string): void {
    this.store.dispatch(setSearchQuery({ query })); 
  }
}
