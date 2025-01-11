import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchService } from '../fetch.service';
import { Temtem } from '../models/temtem.model'; // Importiere das Temtem-Interface
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.scss',
})
// export class DataDisplayComponent implements OnInit {
//   newFetch = inject(FetchService);
//   data: Temtem[] = [];

//   ngOnInit(): void {
//     this.newFetch.fetchData().subscribe((temtems: Temtem[]) => {
//       this.data = temtems;
//       console.log(this.data);
      
//     });
//   }

//   trackById(index: number, item: Temtem): number {
//     return item.number;
//   }
// }
export class DataDisplayComponent implements OnInit {
  newFetch = inject(FetchService);
  data: Temtem[] = [];

  ngOnInit(): void {
    this.newFetch.fetchData().subscribe((temtems: Temtem[]) => {
      this.data = temtems;
      console.log(temtems); // Hier siehst du die vollständigen API-Daten
    });
  }

  trackById(index: number, item: Temtem): number {
    return item.number;
  }

  // Methode zur Suche des Portrait-URLs basierend auf der Nummer
  getPortraitUrl(number: number): string {
    const temtem = this.data.find((t) => t.number === number);
    return temtem ? temtem.portraitWikiUrl : '';
  }
}
