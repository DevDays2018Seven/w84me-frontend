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
  private currentEstimation: Estimation | null = null;
  private locations: WaitLocation[] = [];
  private selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;
  private page: 'search' | 'wait' = 'wait';
  private columns: string[] = [];
  private estimates: { locationId: number, waittime: number, currentWaittime: number }[] = [];

  public constructor(private locationService: LocationService,
    private sessionService: SessionService,
    private estimationService: EstimationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    // seed random data
    this.sessionService.seedRandomSessions();

    this.locations = await this.locationService.getLocationList();
    this.columns = ['location', 'address', 'waittime'];
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

  public fmtAddress(location: WaitLocation): string[] {
    return location.address.split(', ');
  }

  public fmtWaittime(location: WaitLocation): string[] {
    const result: string[] = [];

    const estimate = this.estimates.find((est) => est.locationId === location.id);

    result.push(`Est.: ${estimate.waittime}`);
    result.push(`Avg.: ${estimate.currentWaittime}`);

    return result;
  }

  public pullEstimates(): void {
    this.locations.forEach((location) => {
      this.estimationService.getEstimation(location.id).then((est) => {
        this.estimates.push({locationId: location.id, waittime: est.estimatedWaitingTime, currentWaittime: est.currentAverageWaitingTime});
      })
    });
  }
}
