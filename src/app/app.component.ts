import { Component, OnInit } from '@angular/core';
import { WaitLocation } from './models/waitLocation';
import { LocationService } from './services/location/location.service';
import { SessionService } from './services/session/session.service';
import { WaitSession } from './models/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;
  private session: WaitSession | null = null;

  public constructor(private locationService: LocationService,
    private sessionService: SessionService) { }

  public ngOnInit(): void {
    this.locationService.getLocationList().then(locations => {
      this.locations = locations.map((l) => WaitLocation.fromJson(l));
    });
  }

  public startStopSession(): void {
    if (!this.session) {
      this.session = new WaitSession(this.selectedLocation.id, null, Date.now(), null);
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
