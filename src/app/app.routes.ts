import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'country/:code',
        component: CountryDetailsComponent
    }
];
