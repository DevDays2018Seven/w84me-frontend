import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estimation } from '../../models/estimation';

@Injectable()
export class EstimationService {
  public serverBase = 'http://localhost:3000/api/v1/estimates';

  constructor(private http: HttpClient) { }

  public geEstimation(locationId: number): Promise<Estimation> {
    const url = this.serverBase + '/' + locationId;
    return this.http.get<Estimation>(url)
      .toPromise();
  }
}
