import { Component, inject, Input, OnInit } from '@angular/core';
import { Country } from '../../core/model/model';
import { CommifyPipe } from '../../pipes/commify.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommifyPipe],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  router = inject(Router);
@Input() country: Country | null = null;


  goToDetails(code: string): void {
    this.router.navigate(['/country', code]);
  }
 }
