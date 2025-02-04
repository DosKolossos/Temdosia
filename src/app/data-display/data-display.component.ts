import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FetchService } from '../fetch.service';
import { Temtem } from '../models/temtem.model'; // Importiere das Temtem-Interface
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../shared/header/header.component';
import { SharedService } from '../shared/shared.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgIf, RouterLink],
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss', './data-display-responsive.scss'],
})

export class DataDisplayComponent implements OnInit {
  searchResults: any[] = [];

  constructor(private sharedService: SharedService, private router: Router) { }
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
    return temtem ? temtem.icon : 'https://temdosia.de/assets/img/missing.png';
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
  goTo(name: string): void {
    console.log(name)
    this.sharedService.clearSearchResults();
    this.router.navigate(['/', name]);
  }

  getNameWithoutSpaces(name: string): string {
    return name.replace(/\s+/g, '').replace(/[-'?!]/g, '');
  }

  formatLocationName(name: string): string {
    if (!name) return ''; // Falls null oder undefined, gib einen leeren String zurück
  
    return name
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Fügt Leerzeichen vor Großbuchstaben ein
      .replace(/(of|the|and)/gi, ' $1') // Fügt Leerzeichen vor diesen Wörtern ein (aber doppelte vermeiden!)
      .replace(/\s+/g, ' ') // Entfernt doppelte Leerzeichen
      .trim(); // Entfernt überflüssige Leerzeichen
  }
}
