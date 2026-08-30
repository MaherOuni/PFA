import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  header: HttpHeaders;

  constructor(public http : HttpClient) { }

  getAllUsers(): Observable<any>
  {
    // Demo mode: read the bundled fixture instead of the backend. See
    // ClientsService for the same pattern.
    if (environment.demoMode) {
      return this.http.get('assets/mock/users.json');
    }

    let url = `${environment.apiUrl}/rest/user/all`;
    this.header = new HttpHeaders();
    this.header.append("Content-Type", "application/json");
    return this.http.get(url, {headers: this.header});
  }
}
