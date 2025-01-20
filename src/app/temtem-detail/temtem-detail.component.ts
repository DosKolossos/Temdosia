import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temtem, Technique, Locations } from '../models/temtem.model';
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
    // getPortraitUrl(number: number): string {

    //   const temtem = this.data.find((t) => Number(t.number) === Number(number));

    //   return temtem ? temtem.icon : 'assets/default-placeholder.png'; // Fallback auf Standardbild
    // }
    getPortraitUrl(number: number): string {
      const temtem = this.data.find((t) => t.number === number);
      return temtem ? temtem.portraitWikiUrl : 'assets/default-placeholder.png';
    }
    
    
    hasLocations(): boolean {
      return !!this.temtem?.locations && this.temtem.locations.length > 0;
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

    getGroupedLocations(): { island: string; locations: string[] }[] {
      if (!this.temtem?.locations) return [];
      console.log(this.data[129].evolution);
      const grouped = this.temtem.locations.reduce((acc, loc) => {
        const islandGroup = acc.find(group => group.island === loc.island);
        if (islandGroup) {
          islandGroup.locations.push(loc.location);
        } else {
          acc.push({ island: loc.island, locations: [loc.location] });
        }
        return acc;
      }, [] as { island: string; locations: string[] }[]);
    
      return grouped;
    }
    

    getMatchups(): { multiplier: string; types: string[] }[] {
      if (!this.temtem?.matchUps) return [];
    
      return Object.entries(this.temtem.matchUps).map(([multiplier, types]) => ({
        multiplier,
        types,
      }));
    }
    private typeOrder: string[] = [
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
      'Toxic',
    ];
    
    getAllTypes(): string[] {
      if (!this.temtem?.matchUps) return [];
      // Extrahiere alle Typen und sortiere nach der festen Reihenfolge
      const allTypes = Object.values(this.temtem.matchUps)
        .flat()
        .filter((type, index, self) => self.indexOf(type) === index); // Entferne Duplikate
    
      return this.typeOrder.filter((type) => allTypes.includes(type)); // Nur Typen in der gewünschten Reihenfolge
    }
    
    getClassForMultiplier(multiplier: string): string {
      // Ersetze ungültige Zeichen durch Unterstriche oder andere erlaubte Zeichen
      return multiplier.replace(/[^\w]/g, '_'); // Erlaubt nur Buchstaben, Zahlen und Unterstriche
    }
    
    getMultiplierForType(type: string): string {
      if (!this.temtem?.matchUps) return '';
      // Finde den Multiplikator für den Typ
      for (const [multiplier, types] of Object.entries(this.temtem.matchUps)) {
        if (types.includes(type)) {
          return multiplier;
        }
      }
      return 'x 1'; // Standardwert, falls kein Match gefunden wird
    }


}
