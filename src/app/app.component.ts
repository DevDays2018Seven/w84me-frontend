import { Component, OnInit } from '@angular/core';
import { WaitLocation } from './models/waitLocation';
import { LocationService } from './services/location/location.service';
import { SessionService } from './services/session/session.service';
import { EstimationService } from './services/estimation/estimation.service';
import { Estimation } from './models/estimation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private intervalTimer: Observable<Estimation>;
  private allLocations: WaitLocation[] = [];
  private nearLocations: WaitLocation[] = [];
  private selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;
  private page: 'search' | 'wait' = 'wait';
  private columns: string[] = [];
  private estimates: { locationId: number, waittime: number, currentWaittime: number }[] = [];
  public distance: number;

  public constructor(
    private locationService: LocationService,
    private sessionService: SessionService,
    private estimationService: EstimationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    // seed random data
    this.sessionService.seedRandomSessions();

    // get our data every subsequent 0.5 seconds
    this.intervalTimer = Observable
      .interval(500)
      .skipWhile(() => this.selectedLocation === null) // only fires when component is alive
      .startWith(0)
      .switchMap(() => this.estimationService.getEstimation(this.selectedLocation.id), (x, y) => y);

    this.allLocations = await this.locationService.getLocationList();
    this.nearLocations = this.allLocations;
    this.columns = ['location', 'address', 'waittime'];
  }

  public async updateLocations(): Promise<void> {
    const latitude = 52.114666;
    const longitude = 11.627825;

    if (this.distance === null) {
      this.nearLocations = this.allLocations;
      return;
    }

    this.nearLocations = await this.locationService.getLocationListNearMe(latitude, longitude, this.distance);
  }

  public async startStopSession(): Promise<void> {
    if (this.sessionId) {
      await this.sessionService.stopSession(this.sessionId, this.selectedLocation.id, Date.now());
      this.sessionId = null;
    } else {
      this.sessionId = await this.sessionService.startSession(this.selectedLocation.id, Date.now());
    }
  }

  public async selectLocation(location: WaitLocation): Promise<void> {
    this.selectedLocation = location;
  }

  public fmtAddress(location: WaitLocation): string[] {
    return location.address.split(', ');
  }

  public fmtWaittime(location: WaitLocation): number[] {
    const result: number[] = [];

    const estimate = this.estimates.find((est) => est.locationId === location.id);

    result.push(estimate.waittime);
    result.push(estimate.currentWaittime);

    return result;
  }

  public pullEstimates(): void {
    this.allLocations.forEach((location) => {
      this.estimationService.getEstimation(location.id).toPromise().then((est) => {
        this.estimates.push(
          {
            locationId: location.id,
            waittime: est.estimatedWaitingTime,
            currentWaittime: est.currentAverageWaitingTime
          });
      });
    });
  }
}
