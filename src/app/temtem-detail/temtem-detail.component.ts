import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temtem, Technique } from '../models/temtem.model';
import { FetchService } from '../fetch.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-temtem-detail',
  templateUrl: './temtem-detail.component.html',
  styleUrls: ['./temtem-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TemtemDetailComponent implements OnInit {
  temtem: Temtem | null = null;
  data: Temtem[] = []; // Alle Temtems
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fetchService: FetchService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.fetchService.fetchData().subscribe({
      next: (temtems) => {
        this.data = temtems;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Temtems:', err);
      },
    });
  
    this.route.paramMap.subscribe((params) => {
      const param = params.get('name'); // Hole den Namen aus der URL
      if (param) {
        this.fetchTemtem(param);
      } else {
        this.handleError('Invalid parameter.');
      }
    });
  }
  
    // Methode zur Suche des Portrait-URLs basierend auf der Nummer
    getPortraitUrl(number: number): string {
    
      const temtem = this.data.find((t) => Number(t.number) === Number(number));
    
      return temtem ? temtem.portraitWikiUrl : 'assets/default-placeholder.png'; // Fallback auf Standardbild
    }
    
    

    private fetchTemtem(name: string): void {
      this.fetchService.getTemtemByName(name).subscribe({
        next: (data) => {
          this.temtem = data;
          this.errorMessage = null;
          if (this.temtem?.evolution?.evolutionTree) {
          }
        },
        error: (err) => {
          console.error('Fehler beim Abrufen des Temtems:', err);
          this.handleError('Temtem not found.');
        },
      });
    }
    
    private handleError(message: string): void {
      this.errorMessage = message;
      setTimeout(() => {
        this.router.navigate(['/temtem']); // Zurück zur Übersicht nach 3 Sekunden
      }, 3000);
    }
  

    getLocations(): string {
      return this.temtem?.locations?.map((loc) => loc.location).join(', ') || '';
    }
    getStats(): { statName: string; statValue: number }[] {
      if (!this.temtem?.stats) return [];
    
      return Object.entries(this.temtem.stats).map(([statName, statValue]) => ({
        statName,
        statValue: Number(statValue),
      }));
    }
    getTvs(): { statName: string; statValue: number }[] {
      if (!this.temtem?.stats) return [];
    
      return Object.entries(this.temtem.tvYields).map(([statName, statValue]) => ({
        statName,
        statValue: Number(statValue),
      }));
    }
    getTechniques(): Technique[] {
      return this.temtem?.techniques || [];
    }
}
