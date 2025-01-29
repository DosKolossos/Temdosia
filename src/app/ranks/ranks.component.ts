import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service'; // Importiere den Service
import { Temtem } from '../models/temtem.model'; // Importiere das Interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranks',
  templateUrl: './ranks.component.html',
  styleUrls: ['./ranks.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class RanksComponent implements OnInit {
  temtem: Temtem[] = []; // Alle Temtems

  constructor(private fetchService: FetchService) {}

  ngOnInit(): void {
    this.fetchService.fetchData().subscribe((data: Temtem[]) => {
      this.temtem = data;
    });
  }


  getStats(temtem: Temtem): { statName: string; statValue: number }[] {
    // Prüfe, ob das Temtem Stats hat
    if (!temtem.stats) return [];
  
    // Gib die Stats zurück (keine Transformation nötig, da es bereits das richtige Format hat)
    return temtem.stats;
  }
  
  
}
