import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService {

  public serverBase = 'sessions/';

  constructor(private http: HttpClient) { }

  /** Starts a session and returned the new id */
  public startSession(): Promise<number> {
    const url = this.serverBase + 'StartSession';
    return this.http.post<number>(url, null).toPromise();
  }

  /** Stop a session */
  public stopSession(): Promise<void> {
    const url = this.serverBase + 'StopSession';
    return this.http.post<void>(url, null).toPromise();
  }

}
