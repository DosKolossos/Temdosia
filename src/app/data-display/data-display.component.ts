import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FetchService } from '../fetch.service';
import { Temtem } from '../models/temtem.model'; // Importiere das Temtem-Interface
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../shared/header/header.component';
import { SharedService } from '../shared/shared.service';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgIf, HeaderComponent],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss',
})

export class DataDisplayComponent implements OnInit {
  searchResults: any[] = [];

  constructor(private sharedService: SharedService) { }
  newFetch = inject(FetchService);
  data: Temtem[] = [];

  ngOnInit(): void {

    this.newFetch.fetchData().subscribe((temtems: Temtem[]) => {
      this.data = temtems;
      // Logge alle Stat-Daten

      console.log(temtems); // Hier siehst du die vollständigen API-Daten
      this.sharedService.searchResults$.subscribe((results) => {
        this.searchResults = results;
      });
    });
    this.sharedService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }

  trackById(index: number, item: Temtem): number {
    return item.number;
  }

  closeSearchResults(): void {
    this.sharedService.clearSearchResults();
  }

  // Methode zur Suche des Portrait-URLs basierend auf der Nummer
  getPortraitUrl(number: number): string {
    const temtem = this.data.find((t) => t.number === number);
    return temtem ? temtem.portraitWikiUrl : '';
  }

  scroll300px(index: number): void {
    const totalItems = this.data.length; // Anzahl der Temtems
    if (index >= totalItems - 3) { // Prüfen, ob es eines der letzten drei Temtems ist
      setTimeout(() => {
        window.scrollBy({
          top: 300, // Scrollt 300px nach unten
          behavior: 'smooth', // Weicher Scroll-Effekt
        });
      }, 1000); // Verzögerung, um sicherzustellen, dass die volle Höhe erreicht ist
    }
  }
}
