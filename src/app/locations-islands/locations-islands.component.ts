import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FetchService } from '../fetch.service'; // Importiere den Service
import { Locations } from '../models/temtem.model'; // Interface importieren
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-locations-islands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './locations-islands.component.html',
  styleUrls: ['./locations-islands.component.scss']
})
export class LocationsIslandsComponent implements OnInit {
  islandName: string | null = null;
  allLocations: Locations[] = []; // Alle Orte aus der API
  uniqueLocations: string[] = []; // Gefilterte Liste ohne Duplikate

  constructor(private route: ActivatedRoute, private fetchService: FetchService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.islandName = params.get('island');

      if (this.islandName) {
        this.fetchService.fetchData().subscribe((data: any[]) => {
          this.allLocations = data
            .flatMap(t => t.locations || []) // Alle Orte aus allen Temtems extrahieren
            .filter(loc => loc.island === this.islandName); // Nur Orte der aktuellen Insel behalten

          this.uniqueLocations = [...new Set(this.allLocations.map(loc => loc.location))]; // Orte ohne Duplikate speichern
        });
      }
    });
  }
}
