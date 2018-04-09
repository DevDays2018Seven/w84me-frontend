import { Component, OnInit } from '@angular/core';
import { WaitLocation } from './models/waitLocation';
import { LocationService } from './services/location/location.service';
import { SessionService } from './services/session/session.service';
import { EstimationService } from './services/estimation/estimation.service';
import { Estimation } from './models/estimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public estimation: Estimation;
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;

  public constructor(private locationService: LocationService,
    private sessionService: SessionService,
    private estimationService: EstimationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    this.locations = await this.locationService.getLocationList();
    this.estimation = await this.estimationService.geEstimation(this.locations[0].id);
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
