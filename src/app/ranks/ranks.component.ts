import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service'; // Importiere den Service
import { Temtem } from '../models/temtem.model'; // Importiere das Interface
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss'],
  imports: [CommonModule, RouterLink],
  standalone: true,
})
export class RanksComponent implements OnInit {
  temtem: Temtem[] = []; // Alle Temtems
  filteredTemtem: Temtem[] = []; // Gefilterte Temtems
  selectedType: string | null = null; // Speichert den aktuell ausgewählten Typ


  constructor(private fetchService: FetchService) { }

  types: string[] = [
    'Neutral',
    'Wind',
    'Earth',
    'Water',
    'Fire',
    'Nature',
    'Electric',
    'Mental',
    'Digital',
    'Melee',
    'Crystal',
    'Toxic'
  ]

  ngOnInit(): void {
    this.fetchService.fetchData().subscribe((data: Temtem[]) => {
      this.temtem = data;
      this.filteredTemtem = [...this.temtem]; // Standardmäßig alle anzeigen
      this.sortByStat(7); // Hier wird die Liste direkt nach TOTAL sortiert
    });
  }

  getStats(temtem: Temtem): { statName: string; statValue: number }[] {
    // Prüfe, ob das Temtem Stats hat
    if (!temtem.stats) return [];

    // Gib die Stats zurück (keine Transformation nötig, da es bereits das richtige Format hat)
    return temtem.stats;
  }


  sortByStat(row: number): void {
    this.filteredTemtem.sort((a, b) => {
      return b.stats[row].statValue - a.stats[row].statValue;
    });
  }

  filterByType(type: string): void {
    if (this.selectedType === type) {
      // Falls derselbe Typ nochmal angeklickt wird, Filter zurücksetzen
      this.filteredTemtem = [...this.temtem];
      this.selectedType = null;
      this.sortByStat(7);
    } else {
      // Filter auf ausgewählten Typ setzen
      this.filteredTemtem = this.temtem.filter(t => t.types.includes(type));
      this.selectedType = type;
      this.sortByStat(7);
    }
  }
}
