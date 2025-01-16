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
  private apiUrl = 'https://api.temdosia.de'; // Neue API-URL

  constructor(private http: HttpClient) {}

  getTemtemByName(name: string): Observable<Temtem> {
    return this.http.get<Temtem>(`${this.BASE_URL}/?name=${name}`);
  }
   
  // fetchData(): Observable<Temtem[]> {
  //   return this.httpClient.get<{ [key: string]: Temtem }>(`${this.BASE_URL}/`).pipe(
  //     map((temtemsData) => Object.values(temtemsData)), // Konvertiere Objekt in ein Array
  //     map((temtemsArray) =>
  //       temtemsArray.map((temtem) => ({
  //         ...temtem,
  //         typeIcons: temtem.types.map(
  //           (typeName) => `${this.ICON_BASE_URL}/${typeName}.png`
  //         ),
  //         stats: Object.entries(temtem.stats || {}).map(([key, value]) => ({
  //           statName: key,
  //           statValue: Number(value),
  //         })),
  //         hasLocation: !!temtem.locations && temtem.locations.length > 0,
  //       }))
  //     )
  //   );
  // }
  fetchData(): Observable<Temtem[]> {
    return this.httpClient.get<{ [key: string]: Temtem }>(`${this.BASE_URL}/`).pipe(
      map((temtemsData) => Object.values(temtemsData)), // Konvertiere das Objekt in ein Array
      map((temtemsArray) =>
        temtemsArray.map((temtem) => ({
          ...temtem,
          typeIcons: [
            temtem.type1icon || '', // Nutze das neue Feld `type1icon`
            temtem.type2icon || ''  // Nutze das neue Feld `type2icon`, falls vorhanden
          ].filter((icon) => icon), // Entferne leere Werte, falls kein zweiter Typ existiert
          stats: Object.entries(temtem.stats || {}).map(([key, value]) => ({
            statName: key,
            statValue: Number(value),
          })),
          hasLocation: !!temtem.locations && temtem.locations.length > 0, // Überprüfe, ob Locations vorhanden sind
        }))
      )
    );
  }
  
}