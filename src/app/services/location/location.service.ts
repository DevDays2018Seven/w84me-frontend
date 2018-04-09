import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WaitLocation } from '../../models/waitLocation';

@Injectable()
export class LocationService {
  public serverBase = 'http://localhost:3000/api/v1/locations';

  constructor(private http: HttpClient) { }

  public getLocationList(): Promise<WaitLocation[]> {
    // const config = { headers: new HttpHeaders() };
    // config.headers.append('Content-Type', 'application/json');

    const url = this.serverBase;
    return this.http.get<WaitLocation[]>(url)
      .toPromise();
  }
}
