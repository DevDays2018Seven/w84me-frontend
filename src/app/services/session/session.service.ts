import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService {
  public serverBase = 'http://localhost:3000/api/v1/sessions';

  constructor(private http: HttpClient) { }

  /** Starts a session and returned the new id */
  public startSession(locationId: number, timestamp: number): Promise<number> {
    const url = this.serverBase;
    return this.http.post<{ sessionId: number }>(url, { locationId, timestamp })
      .toPromise()
      .then(response => response.sessionId);
  }

  /** Stopps a session */
  public stopSession(sessionId: number, locationId: number, timestamp: number): Promise<void> {
    const url = this.serverBase;
    return this.http.post<void>(url, { sessionId, locationId, timestamp }).toPromise();
  }

  public seedRandomSessions(): Promise<void> {
    const url = this.serverBase + '/seed';
    return this.http.post<void>(url, {}).toPromise();
  }
}
