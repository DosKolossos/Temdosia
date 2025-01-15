import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  updateSearchResults(results: any[]): void {
    this.searchResultsSubject.next(results);
  }

  clearSearchResults(): void {
    this.searchResultsSubject.next([]);
  }


}
