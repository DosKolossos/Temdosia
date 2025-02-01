import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations-islands',
  standalone: true,
  templateUrl: './locations-islands.component.html',
  styleUrls: ['./locations-islands.component.scss']
})
export class LocationsIslandsComponent implements OnInit {
  islandName: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.islandName = params.get('island');
      console.log('Aktuelle Insel:', this.islandName); // Debugging
    });
  }
}
