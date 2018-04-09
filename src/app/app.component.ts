import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public panelOpenState: boolean = false;

  public constructor(private locationService: LocationService) {

  }

  public test(): void {
    this.locationService.getLocationList().then((list) => {
      console.log('list:', list);
    });
  }
}
