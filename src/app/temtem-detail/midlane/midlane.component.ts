import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Temtem } from '../../models/temtem.model';


@Component({
  selector: 'app-midlane',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './midlane.component.html',
  styleUrl: './midlane.scss'
})
export class MidlaneComponent implements OnChanges {
  @Input() temtem!: Temtem | null;
  singleIsland = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temtem'] && this.temtem?.name) {
      this.checkIfSingleIsland();
    }
  }

  checkIfSingleIsland(): void {
    if (this.temtem?.locations) {
      const uniqueIslands = new Set(this.temtem.locations.map(loc => loc.island));
      this.singleIsland = uniqueIslands.size === 1;
    } else {
      this.singleIsland = false;
    }
  }
  
  
  
  getNameWithoutSpaces(name: string): string {
    return name.replace(/\s+/g, '').replace(/[-'?!]/g, '');
  }
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

  hasLocations(): boolean {
    return !!this.temtem?.locations && this.temtem.locations.length > 0;
  }
  getStatsAndTvs(): { statName: string; statValue: number; tvValue: number }[] {
    if (!this.temtem?.stats || !this.temtem?.tvYields) return [];

    return Object.entries(this.temtem.stats).map(([statName, statValue]) => ({
      statName,
      statValue: Number(statValue),
      tvValue: Number(this.temtem?.tvYields[statName as keyof typeof this.temtem.tvYields] || 0), // Typischer Zugriff
    }));
  }


  getGroupedLocations(): { island: string; locations: string[] }[] {
    if (!this.temtem?.locations) return [];
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
}
