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
  public currentEstimation: Estimation | null = null;
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;
  private page: 'search' | 'wait' = 'wait';
  private columns: string[] = [];

  public constructor(private locationService: LocationService,
    private sessionService: SessionService,
    private estimationService: EstimationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    // seed random data
    this.sessionService.seedRandomSessions();

    this.locations = await this.locationService.getLocationList();
    this.columns = Object.keys(WaitLocation.fromJson({})).map((el) => el.replace('_', ''));
  }

  public async startStopSession(): Promise<void> {
    if (this.sessionId) {
      await this.sessionService.stopSession(this.sessionId, this.selectedLocation.id, Date.now());
      this.sessionId = null;
      this.currentEstimation = await this.estimationService.getEstimation(this.selectedLocation.id);
    } else {
      this.sessionId = await this.sessionService.startSession(this.selectedLocation.id, Date.now());
    }
  }

  public async selectLocation(location: WaitLocation): Promise<void> {
    this.selectedLocation = location;
    this.currentEstimation = await this.estimationService.getEstimation(location.id);
  }
}
