import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WaitSession } from '../../models/session';

@Injectable()
export class SessionService {
  public serverBase = 'http://localhost:3000/api/v1/sessions';

  constructor(private http: HttpClient) { }

  /** Starts a session and returned the new id */
  public startStopSession(session: WaitSession): Promise<number> {
    const url = this.serverBase;
    return this.http.post<number>(url, session).toPromise();
  }
}
