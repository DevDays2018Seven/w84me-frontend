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
  // public currentEstimation: Observable<Estimation>;
  public locations: WaitLocation[] = [];
  public selectedLocation: WaitLocation | null = null;
  private sessionId: number | null = null;
  private page: 'search' | 'wait' = 'wait';
  private columns: string[] = [];
  private intervalTimer: Observable<Estimation>;

  public constructor(
    private locationService: LocationService,
    private sessionService: SessionService,
    private estimationService: EstimationService,
  ) { }

  public async ngOnInit(): Promise<void> {
    // seed random data
    this.sessionService.seedRandomSessions();

    this.locations = await this.locationService.getLocationList();
    this.columns = Object.keys(WaitLocation.fromJson({})).map((el) => el.replace('_', ''));

    // get our data every subsequent 0.5 seconds
    this.intervalTimer = Observable
      .interval(500)
      .skipWhile(() => this.selectedLocation === null) // only fires when component is alive
      .startWith(0)
      .switchMap(() => this.estimationService.getEstimation(this.selectedLocation.id), (x, y) => y);
    // .subscribe(() => this.currentEstimation = this.estimationService.getEstimation(this.selectedLocation.id));
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
}
