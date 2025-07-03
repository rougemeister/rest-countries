import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommifyPipe } from "../../pipes/commify.pipe";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { Country } from '../../core/model/model';


@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommifyPipe, CommonModule, HeaderComponent],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent {
 private route = inject(ActivatedRoute);
 private router = inject(Router);
  private http = inject(HttpClient);

  country$!: Observable<any>;
  Object: any;

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      switchMap(params => {
        const code = params.get('code');
        return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${code}`);
      })
    );

    this.country$.subscribe(country => {
      console.log('Country details:', country);
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getFirstNativeOfficialName(nativeNameObj: any): string {
  const firstLangKey = Object.keys(nativeNameObj)[0];
  return nativeNameObj[firstLangKey]?.official || 'N/A';
}

getFirstCurrencyInfo(currenciesObj: any): string {
  const firstCurrencyKey = Object.keys(currenciesObj)[0]; // e.g., 'GEL', 'USD'
  const currency = currenciesObj[firstCurrencyKey];
  return currency?.name && currency?.symbol
    ? `${currency.name} (${currency.symbol})`
    : 'N/A';
}

getLanguages(languagesObj: any): string {
  if (!languagesObj) return 'N/A';
  return Object.values(languagesObj).join(', ');
}


}
