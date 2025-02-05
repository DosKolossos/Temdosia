import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Temtem, Technique, Locations } from '../models/temtem.model';
import { FetchService } from '../fetch.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-temtem-detail',
  templateUrl: './temtem-detail.component.html',
  styleUrls: ['./temtem-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class TemtemDetailComponent implements OnInit {
  temtem: Temtem | null = null;
  data: Temtem[] = []; // Alle Temtems
  errorMessage: string | null = null;
  hoveredTrait: string | null = null;
  tooltipX: number = 0;
  tooltipY: number = 0;

  onMouseEnter(event: MouseEvent, traitName: string): void {
    this.hoveredTrait = traitName;
    this.tooltipX = event.clientX;
    this.tooltipY = event.clientY;
  }

  onMouseLeave(): void {
    this.hoveredTrait = null;
  }

  getHoveredTraitEffect(): string {
    if (!this.temtem || !this.hoveredTrait) return '';
    const trait = this.temtem.traits.find(t => t.name === this.hoveredTrait);
    return trait ? trait.effect : '';
  }



  constructor(
    private route: ActivatedRoute,
    private fetchService: FetchService,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.fetchService.fetchData().subscribe({
      next: (temtems) => {
        this.data = temtems;
        this.data.sort((a, b) => a.number - b.number);
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

  getTechniques(): Technique[] {
    if (!this.temtem?.techniques) return [];

    // Ergänze ein Fallback für `classIcon`, falls es fehlt
    return this.temtem.techniques.map(technique => ({
      ...technique,
      classIcon: technique.classIcon || `/images/icons/technique/${technique.class}.png`, // Dynamischer Fallback
    }));
  }

  private getTemtemIndexInternal(name: string): number {
    return this.data.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
  }

  public getTemtemIndex(name: string): number {
    return this.getTemtemIndexInternal(name);
  }


  goPrevious(): void {
    if (!this.temtem) return;

    const index = this.getTemtemIndex(this.temtem.name);
    // Nur navigieren, falls wir nicht am Anfang der Liste sind
    if (index > 0) {
      const prevName = this.data[index - 1].name;
      this.router.navigate(['/', prevName]);
    }
  }

  goNext(): void {
    if (!this.temtem) return;

    const index = this.getTemtemIndex(this.temtem.name);
    // Nur navigieren, falls wir nicht am Ende der Liste sind
    if (index < this.data.length - 1) {
      const nextName = this.data[index + 1].name;
      this.router.navigate(['/', nextName]);
    }
  }

  public getNextTemtem(): Temtem | null {
    if (!this.temtem) return null;
    const currentIndex = this.getTemtemIndex(this.temtem.name);
    // Nur wenn nicht am Ende der Liste
    if (currentIndex < this.data.length - 1) {
      return this.data[currentIndex + 1];
    }
    return null;
  }

  public getPrevTemtem(): Temtem | null {
    if (!this.temtem) return null;
    const currentIndex = this.getTemtemIndex(this.temtem.name);
    // Nur wenn nicht am Anfang der Liste
    if (currentIndex > 0) {
      return this.data[currentIndex - 1];
    }
    return null;
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public hasTrivia(): boolean {
    // Prüft, ob es ein Array gibt UND ob es nicht leer ist
    return !!(this.temtem?.trivia && this.temtem.trivia.length > 0);
  }

  getNameWithoutSpaces(name: string): string {
    return name.replace(/\s+/g, '').replace(/[-'?!]/g, '');
  }
}
