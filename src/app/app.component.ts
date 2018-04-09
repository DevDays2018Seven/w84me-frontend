import { Component, OnInit } from '@angular/core';
import { WaitLocation } from './models/waitLocation';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;

  public constructor(private locationService: LocationService) {  }

  public ngOnInit(): void {
    this.locationService.getLocationList().then(locations => {
      this.locations = locations.map((l) => WaitLocation.fromJson(l));
    })
  }
}
