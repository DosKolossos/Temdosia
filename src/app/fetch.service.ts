import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Temtem } from './models/temtem.model'; // Importiere das Temtem-Interface
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FetchService {
  httpClient = inject(HttpClient);
  BASE_URL = 'https://api.temdosia.de';
  TYPES_URL = 'https://temtem-api.mael.tech';
  ICON_BASE_URL = `${this.TYPES_URL}/images/icons/types`;
  private apiUrl = 'https://api.temdosia.de'; // Neue API-URL

  constructor(private http: HttpClient) {}

  getTemtemByName(name: string): Observable<Temtem> {
    return this.http.get<Temtem>(`${this.BASE_URL}/?name=${name}`);
  }
   

  // fetchData(): Observable<Temtem[]> {
  //   return this.httpClient.get<Temtem[]>(`${this.BASE_URL}/`).pipe(
  //     map((temtemsData) =>
  //       temtemsData.map((temtem) => ({
  //         ...temtem,
  //         typeIcons: temtem.types.map(
  //           (typeName) => `${this.ICON_BASE_URL}/${typeName}.png`
  //         ),
  //         stats: Object.entries(temtem.stats || {}).map(([key, value]) => ({
  //           statName: key,
  //           statValue: Number(value),
  //         })),
  //         hasLocation: !!temtem.locations && temtem.locations.length > 0, // Setzt hasLocation basierend auf dem locations-Array
  //       }))
  //     )
  //   );
  // }
  fetchData(): Observable<Temtem[]> {
    return this.httpClient.get<{ [key: string]: Temtem }>(`${this.BASE_URL}/`).pipe(
      map((temtemsData) => Object.values(temtemsData)), // Konvertiere Objekt in ein Array
      map((temtemsArray) =>
        temtemsArray.map((temtem) => ({
          ...temtem,
          typeIcons: temtem.types.map(
            (typeName) => `${this.ICON_BASE_URL}/${typeName}.png`
          ),
          stats: Object.entries(temtem.stats || {}).map(([key, value]) => ({
            statName: key,
            statValue: Number(value),
          })),
          hasLocation: !!temtem.locations && temtem.locations.length > 0,
        }))
      )
    );
  }
  
}