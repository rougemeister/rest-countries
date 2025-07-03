import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../core/model/model';
import { CommifyPipe } from '../../pipes/commify.pipe';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommifyPipe],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
@Input() country: Country | null = null;

 }
