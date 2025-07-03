import { Component, ElementRef, HostListener } from '@angular/core';
import { setFilterRegion } from '../../store/actions/countries.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
 regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string | null = null;
  dropdownOpen = false;

  constructor(private store: Store, private eRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectRegion(region: string | null) {
    this.selectedRegion = region;
    this.dropdownOpen = false;
    this.store.dispatch(setFilterRegion({ region }));
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      
      this.dropdownOpen = false;
    }else {
      this.selectedRegion = null;
    }
  }
}
