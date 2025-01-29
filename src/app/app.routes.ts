import { Routes } from '@angular/router';
import { TemtemDetailComponent } from './temtem-detail/temtem-detail.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { HomeComponent } from './home/home.component'; 
import { NotFoundComponent } from './not-found/not-found.component';
import { ImprintComponent } from './imprint/imprint.component'; 
import { PrivacyComponent } from './privacy/privacy.component';
import { RanksComponent } from './ranks/ranks.component';
import { LocationsComponent } from './locations/locations.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'temtem', component: DataDisplayComponent },
  { path: 'ranks', component: RanksComponent },
  { path: 'locations', component: LocationsComponent },
  { path: ':name', component: TemtemDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
