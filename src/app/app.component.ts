import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { TemtemDetailComponent } from './temtem-detail/temtem-detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ImprintComponent } from './imprint/imprint.component'; 
import { PrivacyComponent } from './privacy/privacy.component';
import { RanksComponent } from './ranks/ranks.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationsIslandsComponent } from './locations-islands/locations-islands.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LocationsIslandsComponent, LocationsComponent, RanksComponent, ImprintComponent, PrivacyComponent, CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, HeaderComponent, TemtemDetailComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TemDosia';
}
