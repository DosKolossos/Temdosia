import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FetchService } from '../../fetch.service';
import { Temtem, Technique, Locations } from '../../models/temtem.model';


@Component({
  selector: 'app-botlane',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './botlane.component.html',
  styleUrl: './botlane.scss'
})
export class BotlaneComponent {
  @Input() temtem: Temtem | null = null;  // <-- Daten von der Elternkomponente erhalten
    data: Temtem[] = []; // Alle Temtems
    
  
  getTechniques(): Technique[] {
    if (!this.temtem?.techniques) return [];

    // Ergänze ein Fallback für `classIcon`, falls es fehlt
    return this.temtem.techniques.map(technique => ({
      ...technique,
      classIcon: technique.classIcon || `/images/icons/technique/${technique.class}.png`, // Dynamischer Fallback
    }));
  }
  public hasTrivia(): boolean {
    // Prüft, ob es ein Array gibt UND ob es nicht leer ist
    return !!(this.temtem?.trivia && this.temtem.trivia.length > 0);
  }

  // private fetchTemtem(name: string): void {
  //   this.fetchService.getTemtemByName(name).subscribe({
  //     next: (data) => {
  //       this.temtem = data;
  //       this.errorMessage = null;
  //       if (this.temtem?.evolution?.evolutionTree) {
  //       }

  //     },
  //     error: (err) => {
  //       console.error('Fehler beim Abrufen des Temtems:', err);
  //       this.handleError('Temtem not found.');
  //     },
  //   });
  // }
}
