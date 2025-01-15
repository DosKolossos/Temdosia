import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Temtem } from '../models/temtem.model'; // Dein Temtem-Interface
import { FetchService } from '../fetch.service'; // Datenservice
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

  constructor(
    private route: ActivatedRoute,
    private fetchService: FetchService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.fetchService.getTemtemByName(name).subscribe((data) => {
        this.temtem = data;
      });
    }
  }

  getLocations(): string {
    return this.temtem?.locations?.map((loc) => loc.location).join(', ') || '';
  }
  

}
