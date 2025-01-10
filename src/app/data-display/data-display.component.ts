import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Temtem {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  typeIcons?: string[];
  traits: string[];
}

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss',
})
export class DataDisplayComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: Temtem[] = [];
  BASE_URL = 'https://temtem-api.mael.tech';
  ICON_BASE_URL = `${this.BASE_URL}/images/icons/types`;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Hole die Temtems-Daten
    this.httpClient.get<Temtem[]>(`${this.BASE_URL}/api/temtems`).subscribe(
      (temtemsData) => {
        this.data = temtemsData.map((temtem) => ({
          ...temtem,
          typeIcons: temtem.types.map((typeName) => `${this.ICON_BASE_URL}/${typeName}.png`),
        }));
        console.log(this.data);
      },
      (error) => console.error('Error fetching temtems:', error)
    );
  }

  trackById(index: number, item: Temtem): number {
    return item.number;
  }
}
