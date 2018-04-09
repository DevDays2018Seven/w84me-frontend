import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public panelOpenState = false;
  public locations = [1, 2, 3, 4, 5];

  public constructor(private locationService: LocationService) {

  }

  public test(): void {
    console.log('test button');
    this.locationService.getLocationList().then((locationList) => {
      console.log('locationList:', locationList);
    });
  }

}
