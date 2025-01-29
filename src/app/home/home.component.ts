import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Entry {
  name: string;
  subtext: string;
  url: string;
  target: string;
  img: string;
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
      name: "Locations",
      subtext: "Explore locations.",
      url: "/locations",
      target: "_self",
      img:"",
    },
    "Ranks": {
      name: "Ranks",
      subtext: "See the high-tier Temtems.",
      url: "/ranks",
      target: "_self",
      img:"",
    },
    "Teambuilder": {
      name: "Teambuilder",
      subtext: "Create your squad.",
      url: "/teambuilder",
      target: "_self",
      img:"",
    },
    "Developer": {
      name: "Developer",
      subtext: "David hates advertising on wikis.",
      url: "https://www.david-kolosza.de",
      target: "_blank",
      img:"",
    }
  };

  getEntriesArray(): Entry[] {
    // Object.values(...) macht aus {key: Entry} ein Array<Entry>
    return Object.values(this.entries);
  }
}


