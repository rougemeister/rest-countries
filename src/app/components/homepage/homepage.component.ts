import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavComponent } from "../../shared/nav/nav.component";
import { CountryComponent } from "../country/country.component";
import { Store } from '@ngrx/store';
import { loadCountries } from '../../store/actions/countries.actions';
import { selectFilteredCountries, selectLoading, selectError } from '../../store/selectors/countries.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, NavComponent, CountryComponent,AsyncPipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  private store = inject(Store);
  countries$ = this.store.select(selectFilteredCountries);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(loadCountries());
  }
}
