import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';  // Die Standalone-Root-Komponente
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app.routes'; // Importiere die Routen


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Korrekte Verwendung
    provideRouter(routes)
  ],
}).catch((err) => console.error(err));
