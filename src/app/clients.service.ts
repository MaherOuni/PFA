import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  header: HttpHeaders;
  constructor(public http : HttpClient) { }

  getAllClients(): Observable<any>
  {
    // Demo mode: read the bundled fixture instead of the backend. It is served
    // from the build output, so this stays a normal HTTP GET and callers do
    // not need to change.
    if (environment.demoMode) {
      return this.http.get('assets/mock/clients.json');
    }

    let url = `${environment.apiUrl}/rest/client/all`;
    this.header = new HttpHeaders();
    this.header.append("Content-Type", "application/json");
    return this.http.get(url, {headers: this.header});
  }
}
