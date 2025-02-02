import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchService } from '../fetch.service';
import { CommonModule } from '@angular/common';
import { Temtem } from '../models/temtem.model';
import { RouterLink } from '@angular/router'; // ✅ WICHTIG: Import hinzufügen

@Component({
  selector: 'app-locations-detail',
  standalone: true,
  imports: [CommonModule, RouterLink], // ✅ RouterLink in die Imports aufnehmen
  templateUrl: './locations-detail.component.html',
  styleUrl: './locations-detail.component.scss'
})
export class LocationsDetailComponent implements OnInit {
  islandName: string | null = null;
  locationName: string | null = null;
  temtemsAtLocation: Temtem[] = [];

  constructor(private route: ActivatedRoute, private fetchService: FetchService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.islandName = params.get('island');
      this.locationName = params.get('location');
      this.loadTemtems();
      console.log("Location Name:", this.locationName); // Debugging

    });
  }

  loadTemtems(): void {
    if (!this.locationName) return;

    this.fetchService.fetchData().subscribe((data: Temtem[]) => {
      this.temtemsAtLocation = data.filter(t =>
        t.locations?.some(loc => this.getNameWithoutSpaces(loc.location) === this.locationName)
      );
    });
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
