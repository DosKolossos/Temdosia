import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Temtem, Technique, Locations  } from '../../models/temtem.model';


@Component({
  selector: 'app-toplane',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './toplane.component.html',
  styleUrl: './toplane.scss'
})
export class ToplaneComponent {
  @Input() temtem: Temtem | null = null;  // <-- Daten von der Elternkomponente erhalten
  @Input() data: Temtem[] = [];

  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router

  ) { }
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

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getPortraitUrl(number: number): string {
   
    const temtem = this.data.find((t) => t.number === number);
    return temtem ? temtem.portraitWikiUrl : 'assets/default-placeholder.png';
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.router.navigate(['/temtem']); // Zurück zur Übersicht nach 3 Sekunden
    }, 3000);
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
}
