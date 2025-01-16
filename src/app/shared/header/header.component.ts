import { Component, OnInit, inject } from '@angular/core';
import { Temtem } from '../../models/temtem.model';
import { CommonModule } from '@angular/common';
import { FetchService } from '../../fetch.service';
import { SharedService } from '../../shared/shared.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class HeaderComponent implements OnInit {

  constructor(private sharedService: SharedService, private router: Router) { }
  data: Temtem[] = []; // Hier sind alle Temtem-Daten
  searchResults: {
    name: string;
    types: { name: string; icon: string }[]; // Typen mit Namen und Icons
    location?: string;
    technique?: string;
    trait?: string;
    number: number;
    icon: string; // Haupt-Icon des Temtems
  }[] = [];

  fetchService = inject(FetchService); // Inject FetchService
  
  ngOnInit(): void {
    this.fetchService.fetchData().subscribe((temtems) => {
      this.data = temtems; // Daten in der Komponente speichern
    });
    this.sharedService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }


  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase(); // Eingabe als String

    // Starte die Suche nur, wenn die Eingabe mehr als 2 Zeichen hat
    if (input.length > 2) {
      const filteredResults = this.data
        .filter((temtem) =>
          temtem.name.toLowerCase().includes(input) || // Name durchsuchen
          temtem.types.some((type) => type.toLowerCase().includes(input)) || // Typen durchsuchen
          temtem.traits.some((trait) => trait.toLowerCase().includes(input)) || // Traits durchsuchen
          temtem.locations?.some((loc) => loc.location.toLowerCase().includes(input))// Locations durchsuchen
        )
        .map((temtem) => ({
          name: temtem.name,
          types: temtem.types.map((type, index) => ({
            name: type,
            icon: temtem.typeIcons?.[index] || '' // Typ-Icon zuweisen
          })),
          location: temtem.locations?.map((loc) => loc.location).join(', '),
          trait: temtem.traits.join(', '),
          icon: temtem.portraitWikiUrl, // Icon-URL hinzufügen
          number: temtem.number,
        }));

      this.sharedService.updateSearchResults(filteredResults); // Ergebnisse an SharedService weitergeben
    } else {
      // Wenn weniger als 3 Zeichen eingegeben wurden, leere die Suchergebnisse
      this.sharedService.clearSearchResults();
    }
  }

  onTemtemClick(name: string): void {
    console.log(name);

    this.fetchService.getTemtemByName(name).subscribe({
      next: (temtem) => {
        console.log('Temtem gefunden:', temtem);
      },
      error: (err) => {
        console.error('Fehler beim Abrufen des Temtems:', err);
      }
    });
  }

  closeSearchResults(): void {
    this.sharedService.clearSearchResults();
  }


  goTo(name: string): void {
    this.sharedService.clearSearchResults();
 
  }
}


