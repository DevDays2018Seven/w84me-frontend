import { Component, OnInit } from '@angular/core';
import { WaitLocation } from './models/waitLocation';
import { LocationService } from './services/location/location.service';
import { SessionService } from './services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;

  public constructor(private locationService: LocationService,
    private sessionService: SessionService) { }

  public async ngOnInit(): Promise<void> {
    this.locations = await this.locationService.getLocationList();
    console.log(this.locations);
  }

  public async startStopSession(): Promise<void> {
    if (this.sessionId) {
      await this.sessionService.stopSession(this.sessionId, this.selectedLocation.id, Date.now());
      this.sessionId = null;
    } else {
      this.sessionId = await this.sessionService.startSession(this.selectedLocation.id, Date.now());
    }
  }
}
