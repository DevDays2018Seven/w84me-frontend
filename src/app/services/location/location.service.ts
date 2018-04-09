import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {
  public serverBase = 'locations/';

  constructor(private http: HttpClient) { }

  public getLocationList(): Promise<Location[]> {
    const url = this.serverBase + 'GetLocations';
    return this.http.get<Location[]>(url).toPromise();
  }
}
