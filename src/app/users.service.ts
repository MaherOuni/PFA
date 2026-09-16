import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { DemoService } from './demo/demo.service';
import { DemoStoreService } from './demo/demo-store.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  header: HttpHeaders;

  constructor(public http: HttpClient,
              private demo: DemoService,
              private store: DemoStoreService) { }

  getAllUsers(): Observable<any> {
    // Demo mode: serve the in-memory catalogue. See ClientsService for the
    // same pattern.
    if (this.demo.active) {
      return of(this.store.staff);
    }

    const url = `${environment.apiUrl}/rest/user/all`;
    this.header = new HttpHeaders();
    this.header.append('Content-Type', 'application/json');
    return this.http.get(url, {headers: this.header});
  }
}
