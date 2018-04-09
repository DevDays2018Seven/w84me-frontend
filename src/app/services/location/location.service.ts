import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {
  public serverBase = 'http://localhost:3000/api/v1/locations';

  constructor(private http: HttpClient) { }

  public getLocationList(): Promise<Location[]> {
    const url = this.serverBase;
    return this.http.get<Location[]>(url).toPromise();
  }
}
