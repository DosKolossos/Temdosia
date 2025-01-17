import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temtem } from '../models/temtem.model';
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
        console.log('Geladene Daten:', this.data); // Logge alle Temtems
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
      console.log('Daten in getPortraitUrl:', this.data); // Logge die gesamte Datenliste
      console.log('Gesuchte Nummer:', number); // Logge die Nummer, nach der gesucht wird
    
      const temtem = this.data.find((t) => Number(t.number) === Number(number));
      if (temtem) {
        console.log('Gefundenes Temtem:', temtem); // Logge das gefundene Temtem
      } else {
        console.log('Kein Temtem gefunden für Nummer:', number); // Logge, wenn nichts gefunden wird
      }
    
      return temtem ? temtem.portraitWikiUrl : 'assets/default-placeholder.png'; // Fallback auf Standardbild
    }
    
    

    private fetchTemtem(name: string): void {
      this.fetchService.getTemtemByName(name).subscribe({
        next: (data) => {
          this.temtem = data;
          this.errorMessage = null;
          console.log('Gefundenes Temtem:', this.temtem); // Logge die gesamte Temtem-Daten
          if (this.temtem?.evolution?.evolutionTree) {
            console.log('EvoTree:', this.temtem.evolution.evolutionTree); // Logge den EvoTree
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


}
