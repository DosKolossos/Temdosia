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
    const name = this.route.snapshot.paramMap.get('name');
    const number = Number(name)
    if (name) {
      this.fetchService.getTemtemByName(number).subscribe({
        next: (data) => {
          this.temtem = data;
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = 'Temtem not found!';
          console.error(err);
          setTimeout(() => {
            this.router.navigate(['/temtem']); // Zurück zur Übersicht nach 3 Sekunden
          }, 3000);
        },
      });
    }
  }

  getLocations(): string {
    return this.temtem?.locations?.map((loc) => loc.location).join(', ') || '';
  }
  

}
