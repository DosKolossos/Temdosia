import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Temtem, Technique, Locations } from '../models/temtem.model';
import { FetchService } from '../fetch.service';
import { CommonModule } from '@angular/common';
import { ToplaneComponent } from './toplane/toplane.component';
import { MidlaneComponent } from './midlane/midlane.component';
import { BotlaneComponent } from './botlane/botlane.component';

@Component({
  selector: 'app-temtem-detail',
  templateUrl: './temtem-detail.component.html',
  styleUrls: ['./temtem-detail.component.scss', './toplane/toplane.scss', './midlane/midlane.scss', './botlane/botlane.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, ToplaneComponent, MidlaneComponent, BotlaneComponent],
})
export class TemtemDetailComponent implements OnInit {
  temtem: Temtem | null = null;
  data: Temtem[] = []; // Alle Temtems
  errorMessage: string | null = null;




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
}
