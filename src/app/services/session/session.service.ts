import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SessionService {

  public serverBase = 'sessions/';

  constructor(private http: HttpClient) { }

}
