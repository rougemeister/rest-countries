import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Country } from '../model/model';
import { CACHED_KEY, API_URL } from '../constants/constants';

@Injectable({ providedIn: 'root' })
export class CountryApiService {
  private memoryCache: Country[] | null = null;

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    if (this.memoryCache) return of(this.memoryCache);

    const cached = localStorage.getItem(CACHED_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as Country[];
      this.memoryCache = parsed;
      return of(parsed);
    }

    return this.http.get<Country[]>(API_URL).pipe(
      tap(data => {
        this.memoryCache = data;
        localStorage.setItem(CACHED_KEY, JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  getCountryByCca3(code: string): Observable<Country | undefined> {
    return this.getAllCountries().pipe(
      map(countries => countries.find(c => c.cca3 === code))
    );
  }

  clearCache(): void {
    this.memoryCache = null;
    localStorage.removeItem(CACHED_KEY);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('Failed to load country data'));
  }
}
