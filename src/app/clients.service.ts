import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { DemoService } from './demo/demo.service';
import { DemoStoreService } from './demo/demo-store.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  header: HttpHeaders;

  constructor(public http: HttpClient,
              private demo: DemoService,
              private store: DemoStoreService) { }

  getAllClients(): Observable<any> {
    // Demo mode: serve the in-memory catalogue rather than the backend. It
    // comes from the store instead of a static JSON file so that a client
    // added on this page is still there after a reload.
    if (this.demo.active) {
      return of(this.store.clients);
    }

    const url = `${environment.apiUrl}/rest/client/all`;
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: this.header});
  }
}
