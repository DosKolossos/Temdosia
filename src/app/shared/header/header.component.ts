import { Component, OnInit } from '@angular/core';
import { Temtem } from '../../models/temtem.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  data: Temtem[] = []; // Hier sind alle Temtem-Daten
  searchResults: { name: string; type: string; location?: string; technique?: string; trait?: string }[] = [];

  ngOnInit(): void {
    // Fetched Data (Mock-Daten oder aus API laden)
    this.data =
      [
        {
          number: 1,
          name: 'Mimit',
          types: ['Digital'],
          traits: ['Striking Transmog'],
          locations: [{ location: 'Iwaba' }],
          portraitWikiUrl: 'https://example.com/mimit.png', // Beispiel-URL
          stats: [{ statName: 'HP', statValue: 50 }, { statName: 'Attack', statValue: 40 }] // Beispiel-Stats
        },// Weitere Temtem-Daten
      ];
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Sicherstellen, dass es sich um ein HTMLInputElement handelt
    const searchValue = input.value; // Zugriff auf den Wert
    console.log('Suchbegriff:', searchValue);
    // Hier kannst du die Filterlogik hinzufügen
  }
}


