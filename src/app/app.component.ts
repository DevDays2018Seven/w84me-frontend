import { Component } from '@angular/core';
import { LocationService } from './services/location/location.service';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public panelOpenState = false;
  public locations = [1, 2, 3, 4, 5];
  private session: WaitSession | null = null;

  public constructor(private locationService: LocationService,
    private sessionService: SessionService) {

  }

  public test(): void {
    console.log('test button');
    this.locationService.getLocationList().then((locationList) => {
      console.log('locationList:', locationList);
    });
  }

  public startStopSession(): void {
    if (!this.session) {
      this.session = new WaitSession(null, this.locations[0], Date.now(), null);
    } else {
      this.session.timestampEnd = Date.now();
    }

    this.sessionService.startStopSession(this.session).then((sessionsId) => {
      if (this.session.timestampEnd) {
        this.session = null;
      } else {
        this.session.id = sessionsId;
      }
      console.log('sessionsId:', sessionsId);
    });
  }

}
