import { Component, OnInit, inject } from '@angular/core';
import { Temtem } from '../../models/temtem.model';
import { CommonModule } from '@angular/common';
import { FetchService } from '../../fetch.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
constructor(private sharedService: SharedService){}

  data: Temtem[] = []; // Hier sind alle Temtem-Daten
  // searchResults: { name: string; type: string; location?: string; technique?: string; trait?: string }[] = [];
  searchResults: any[] = []; // Hier die fehlende Eigenschaft hinzufügen

  fetchService = inject(FetchService); // Inject FetchService

  ngOnInit(): void {
    // // Daten von der API laden
    // this.fetchService.fetchData().subscribe((temtems) => {
    //   this.data = temtems;
    // });
    this.sharedService.searchResults$.subscribe((results) => {
      this.searchResults = results;
    });
  }

  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase(); // Sicherstellen, dass der Wert ein String ist
    console.log('Suchbegriff:', input);
  
    // Filterlogik
    const filteredResults = this.data
      .filter((temtem) =>
        temtem.name.toLowerCase().includes(input) || // Name durchsuchen
        temtem.types.some((type) => type.toLowerCase().includes(input)) || // Typen durchsuchen
        temtem.traits.some((trait) => trait.toLowerCase().includes(input)) || // Traits durchsuchen
        temtem.locations?.some((loc) => loc.location.toLowerCase().includes(input)) // Locations durchsuchen
      )
      .map((temtem) => ({
        name: temtem.name,
        type: temtem.types.join(', '),
        location: temtem.locations?.map((loc) => loc.location).join(', '),
        trait: temtem.traits.join(', ')
      }));
  
    // Ergebnisse an SharedService weitergeben
    this.sharedService.updateSearchResults([
      { name: 'Example Temtem', type: 'Digital', location: 'Iwaba', trait: 'Striking Transmog' }
    ]);
  }

    closeSearchResults(): void {
      this.sharedService.clearSearchResults();
    }
}


