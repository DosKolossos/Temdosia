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
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement) return;
    
    const input = inputElement.value.toLowerCase();
  
    if (input.length > 2) {
      const filteredResults = this.data
        .filter((temtem) =>
          temtem.name.toLowerCase().includes(input) ||
          temtem.types.some((type) => type.toLowerCase().includes(input)) ||
          temtem.traits?.some((trait) => trait.name.toLowerCase().includes(input)) || // Fix: Greift auf 'name' zu!
          temtem.locations?.some((loc) => loc.location.toLowerCase().includes(input))
        )
        .map((temtem) => ({
          name: temtem.name,
          types: [
            { name: temtem.types[0], icon: temtem.type1icon },
            temtem.types[1] ? { name: temtem.types[1], icon: temtem.type2icon } : null
          ].filter((type) => type !== null),
          location: temtem.locations?.map((loc) => loc.location).join(', '),
          trait: temtem.traits?.map((trait) => trait.name).join(', '), // Fix: Zeigt jetzt korrekt die Trait-Namen an
          icon: "https://temtem-api.mael.tech/"+temtem.icon,
          number: temtem.number,
        }));
  
      this.sharedService.updateSearchResults(filteredResults);
    } else {
      this.sharedService.clearSearchResults();
    }
  }
  

  onTemtemClick(name: string): void {

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


  goTo(name: string, inputElement?: HTMLInputElement): void {
    this.sharedService.clearSearchResults();
    this.router.navigate(['/', name]);
  
    // Falls ein Input-Element übergeben wurde, das Feld leeren
    if (inputElement) {
      inputElement.value = '';
    }
  }
}


