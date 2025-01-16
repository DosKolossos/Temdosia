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
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fetchService: FetchService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const param = params.get('name'); // Hole den Namen aus der URL
      if (param) {
        this.fetchTemtem(param);
      } else {
        this.handleError('Invalid parameter.');
      }
    });        
  }

  private fetchTemtem(name: string): void {
    this.fetchService.getTemtemByName(name).subscribe({
      next: (data) => {
        this.temtem = data;
        this.errorMessage = null;
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
