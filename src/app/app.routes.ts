import { Routes } from '@angular/router';
import { TemtemDetailComponent } from './temtem-detail/temtem-detail.component';
import { DataDisplayComponent } from './data-display/data-display.component'; // Importiere die Komponente
import { HomeComponent } from './home/home.component'; // Stelle sicher, dass es eine HomeComponent gibt
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'temtem', component: DataDisplayComponent }, // Neue Route
  { path: 'temtem/:name', component: TemtemDetailComponent },
  { path: 'home', component: HomeComponent }, // Füge die Home-Route hinzu
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Optionale Startseite
  { path: '**', component: NotFoundComponent }
];
