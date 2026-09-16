import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { DemoService } from './demo/demo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  header: HttpHeaders;
  jwt = undefined;

  constructor(public http: HttpClient, private demo: DemoService) { }

  /**
   * True when the app runs with no backend. Components can use this to hide
   * anything that needs a real session.
   */
  get demoMode(): boolean {
    return this.demo.active;
  }

  authenticate(credentials): Observable<any> {
    // Demo mode: accept any credentials and hand back a placeholder token, so
    // the login screen and the rest of the flow behave exactly as they do
    // against the real backend.
    if (this.demo.active) {
      return of({ jwt: 'demo-mode-token' });
    }

    const url = `${environment.apiUrl}/api/authenticate`;
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    return this.http.post(url, credentials, {headers: {skip: 'true'}});
  }
}
