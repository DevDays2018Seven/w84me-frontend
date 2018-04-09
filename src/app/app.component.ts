import { Component } from '@angular/core';
import { Location } from './models/location';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public locations: Location[] = [1, 2, 3, 4, 5].map(el => new Location(el, `Name${el}`, `Description${el}`, 'here', 'there', 'nowhere'));
  public selectedLocation: Location | null = null;

  public constructor(private locationService: LocationService) {  }

  public test(): void {
    console.log('test button');
    this.locationService.getLocationList().then((locationList) => {
      console.log('locationList:', locationList);
    });
  }
}
