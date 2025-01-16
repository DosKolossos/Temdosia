import { Routes } from '@angular/router';
import { TemtemDetailComponent } from './temtem-detail/temtem-detail.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { HomeComponent } from './home/home.component'; 
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'temtem', component: DataDisplayComponent },
  { path: ':name', component: TemtemDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
