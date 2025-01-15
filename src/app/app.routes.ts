import { Routes } from '@angular/router';
import { TemtemDetailComponent } from './temtem-detail/temtem-detail.component';
import { DataDisplayComponent } from './data-display/data-display.component'; // Importiere die Komponente
import { HomeComponent } from './home/home.component'; // Stelle sicher, dass es eine HomeComponent gibt

export const routes: Routes = [
  { path: 'temtem/:name', component: TemtemDetailComponent },
  { path: 'temtem', component: DataDisplayComponent }, // Neue Route
  { path: 'home', component: HomeComponent }, // Füge die Home-Route hinzu
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Optionale Startseite
  { path: '**', redirectTo: '/temtem', pathMatch: 'prefix' }

];
