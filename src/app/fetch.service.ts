import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Temtem } from './models/temtem.model'; // Importiere das Temtem-Interface

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  httpClient = inject(HttpClient);
  BASE_URL = 'https://temtem-api.mael.tech';
  ICON_BASE_URL = `${this.BASE_URL}/images/icons/types`;


  fetchData(): Observable<Temtem[]> {
    return this.httpClient.get<Temtem[]>(`${this.BASE_URL}/api/temtems`).pipe(
      map((temtemsData) =>
        temtemsData.map((temtem) => ({
          ...temtem,
          typeIcons: temtem.types.map(
            (typeName) => `${this.ICON_BASE_URL}/${typeName}.png`
          ),
          stats: Object.entries(temtem.stats || {}).map(([key, value]) => ({
            statName: key,
            statValue: Number(value),
          })),
          hasLocation: !!temtem.locations && temtem.locations.length > 0, // Setzt hasLocation basierend auf dem locations-Array
        }))
      )
    );
  }
  
}