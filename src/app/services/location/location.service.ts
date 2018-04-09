import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WaitLocation } from '../../models/waitLocation';

@Injectable()
export class LocationService {
  public serverBase = 'http://localhost:3000/api/v1/locations';

  constructor(private http: HttpClient) { }

  public getLocationList(): Promise<WaitLocation[]> {
   const url = this.serverBase;
    return this.http.get<WaitLocation[]>(url)
      .toPromise();
  }

  public getLocationListNearMe(latitude: number, longitude: number, distance: number): Promise<WaitLocation[]> {
    const url = `${this.serverBase}?latitude=${latitude}&longitude=${longitude}&distance=${distance}`;
     return this.http.get<WaitLocation[]>(url)
       .toPromise();
   }
}
