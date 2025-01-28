import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Entry {
  name: string;
  subtext: string;
  url: string;
  target: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterOutlet, CommonModule, RouterLink],
  styleUrls: ['./home.component.scss'], // Wichtig: Pfad muss stimmen
  standalone: true,
})
export class HomeComponent {
  entries: { [key: string]: Entry } = {
    "Location": {
      name: "Location",
      subtext: "Locations are funny.",
      url: "/locations",
      target: "_self"
    },
    "Ranks": {
      name: "Ranks",
      subtext: "Locations are funny.",
      url: "/ranks",
      target: "_self"
    },
    "Teambuilder": {
      name: "Teambuilder",
      subtext: "Locations are funny.",
      url: "/teambuilder",
      target: "_self"
    },
    "Developer": {
      name: "Developer",
      subtext: "David hates advertising on wikis.",
      url: "https://www.david-kolosza.de",
      target: "_blank"
    }
  };

  getEntriesArray(): Entry[] {
    // Object.values(...) macht aus {key: Entry} ein Array<Entry>
    return Object.values(this.entries);
  }
}


